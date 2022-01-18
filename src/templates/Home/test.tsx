import 'match-media-mock'
import { render, screen } from 'utils/test-utils'
import bannerMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import Home from '.'

const props = {
  banners: bannerMock,
  newGames: gamesMock,
  newGamesTitle: 'New Games',
  mostPopularHighlight: highlightMock,
  mostPopularGamesTitle: 'Popular Games',
  mostPopularGames: gamesMock,
  upcomingGames: gamesMock,
  upcomingGamesTitle: 'Upcoming Games',
  upcomingHighlight: highlightMock,
  freeGames: gamesMock,
  freeGamesTitle: 'Free Games',
  freeGamesHighlight: highlightMock
}

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>
    }
  }
})

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>
    }
  }
})

describe('<Home />', () => {
  it('should render menu and footer', () => {
    render(<Home {...props} />)

    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
  })
})
