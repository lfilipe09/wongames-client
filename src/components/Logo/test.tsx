import { render, screen } from 'utils/test-utils'

import Logo from '.'

describe('<Logo />', () => {
  it('should render the logo with id passed', () => {
    const { container } = render(<Logo id="myId" />)

    expect(container.querySelector('#a_myId')).toBeInTheDocument()
  })

  it('should render a white label by default', () => {
    //1º passo: renderizar o componente com o 'render'
    //2º passo: selecionar o elemetoa ser testado com o 'screen' que são as queries (getby...)
    //3º passo: expect, aqui que faz a comparação (espero que...)
    render(<Logo />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a white label by default', () => {
    render(<Logo color="black" />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a bigger logo', () => {
    render(<Logo size="large" />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '20rem'
    })
  })

  it('should render a normal logo when size is default', () => {
    render(<Logo />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '11rem'
    })
  })

  it('should render a bigger logo without text if hideOnMobile', () => {
    render(<Logo hideOnMobile />)
    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyleRule(
      'width',
      '5.8rem',
      {
        media: '(max-width: 768px)'
      }
    )
  })
})
