import Home, { HomeTemplateProps } from 'templates/Home'
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'
import { initializeApollo } from 'utils/apollo'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}
//getStaticProps -> gerar estático em build time
//getServerSideProps -> gerar via ssr a cada request
//getInitialProps -> gerar via ssr a cada request (Mesma coisa do SSR)
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  //o slice 0,10 é pq ta usando as primeiras 10 carac
  const TODAY = new Date().toISOString().slice(0, 10)

  const {
    data: { banners, newGames, freeGames, sections, upcomingGames }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: { date: TODAY },
    fetchPolicy: 'no-cache'
  }) //o fetchPolicy existe apra não entrar em contradição com o revalidate
  //no revalidate, nós precisamos atualizar o dado de tempos em tempo, mas para não
  //correr o risco dele buscar o dado no cche do apollo e não atualizar o estático
  //usa-se o fetchPolicy para não usar o cache e nem armazenar nele depois
  //O no-cache garante dado novo em toda nova a geração do estático

  //faz lógica:
  //buscar dados API
  //Cálculo, leitura de context

  //e termina retornando dados
  return {
    revalidate: 10,
    props: {
      banners: bannerMapper(banners),
      newGames: gamesMapper(newGames),
      newGamesTitle: sections?.newGames?.title,
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      upcomingGames: gamesMapper(upcomingGames),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGames: gamesMapper(freeGames),
      freeGamesTitle: sections?.freeGames?.title,
      freeGamesHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  }
}

//ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES
