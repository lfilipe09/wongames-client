import { renderWithTheme } from 'utils/tests/helpers'
import filterItemsMock from 'components/ExploreSidebar/mock'

import Games from '.'

describe('<Games />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Games filterItems={filterItemsMock} />)
  })
})
