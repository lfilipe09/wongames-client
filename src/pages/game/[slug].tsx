import { useRouter } from 'next/router'

import Game, { GameTemplateProps } from 'templates/Game'
import { initializeApollo } from 'utils/apollo'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAME_BY_SLUG, QUERY_GAMES } from 'graphql/queries/games'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { GetStaticProps } from 'next'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from 'graphql/generated/QueryUpcoming'
import { QUERY_UPCOMING } from 'graphql/queries/upcoming'

//está criando o apollo fora para ser usado no getStaticPaths e getStaticProps
const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  //se a rota não tiver sido gerada ainda
  //você pode mostrar um loading
  //uma tela de esqueleto
  if (router.isFallback) return null

  return <Game {...props} />
}

//o 9 significa pra ele gerar 9 páginas (que são as mesmas que aparecem lá na pág de games)
//se não especificar ele gera todas do slug aí fica mto e o tempo de build fica gigante
//O get static paths é para dizer as páginas para o static props
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  })
  //no getStaticPaths não tem problema guardar os dados no cache, por isso não tem policy

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

//gerar em build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Get game data
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })
  //os debaixo não tem problema gerar novo então não precisa por sem usar o cache
  //Mas os dados do jogo quer sempre que gere novo

  //Se não tiver dado, ele joga para a página 404, esses comandos abaixo o next já entende
  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  //Get recommended games

  const { data: recSection } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  //Get upcoming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcoming } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    revalidate: 60,
    props: {
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingTitle: upcoming.showcase?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(
        upcoming.showcase?.upcomingGames?.highlight
      ),
      recommendedGames: gamesMapper(recSection.recommended?.section?.games),
      recommendedTitle: recSection.recommended?.section?.title
    }
  }
}
