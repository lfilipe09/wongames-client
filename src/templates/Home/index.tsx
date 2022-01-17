import { BannerProps } from 'components/Banner'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

import { Container } from 'components/Container'

import * as S from './styles'
import BannerSlider from 'components/BannerSlider'
import Showcase from 'components/Showcase'
import Base from 'templates/Base'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGames: GameCardProps[]
  newGamesTitle: string
  mostPopularGames: GameCardProps[]
  mostPopularHighlight: HighlightProps
  mostPopularGamesTitle: string
  upcomingGames: GameCardProps[]
  upcomingGamesTitle: string
  upcomingHighlight: HighlightProps
  freeGames: GameCardProps[]
  freeGamesTitle: string
  freeGamesHighlight: HighlightProps
}

const Home = ({
  banners,
  freeGames,
  freeGamesTitle,
  freeGamesHighlight,
  mostPopularGames,
  mostPopularGamesTitle,
  mostPopularHighlight,
  newGames,
  newGamesTitle,
  upcomingGames,
  upcomingGamesTitle,
  upcomingHighlight
}: HomeTemplateProps) => (
  <Base>
    <Container>
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    <S.SectionNews>
      <Showcase title={newGamesTitle} games={newGames} color="black" />
    </S.SectionNews>

    <Showcase
      title={mostPopularGamesTitle}
      highlight={mostPopularHighlight}
      games={mostPopularGames}
    />

    <Showcase
      title={upcomingGamesTitle}
      games={upcomingGames}
      highlight={upcomingHighlight}
    />

    <Showcase
      title={freeGamesTitle}
      highlight={freeGamesHighlight}
      games={freeGames}
    />
  </Base>
)

export default Home
