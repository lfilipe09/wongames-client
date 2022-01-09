import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes
} from 'react'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  icon?: JSX.Element //deixa ainda mais genérico, funcionando com react ou outros
  as?: React.ElementType
  minimal?: boolean
} & ButtonTypes

//A dupla negação do children significa "se ele de fato existir..."
//A dupla negação previne de acabar mandando um elemento inválido ou inexistente
const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    size = 'medium',
    fullWidth = false,
    icon,
    minimal = false,
    ...props
  },
  ref
) => (
  <S.Wrapper
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!icon}
    minimal={minimal}
    ref={ref}
    {...props}
  >
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
)

export default forwardRef(Button)
