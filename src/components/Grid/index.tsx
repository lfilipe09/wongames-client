import styled, { css } from 'styled-components'

//o auto-fill significa que quer que ele preencha automaticamente os espaços e dentro da função minmax vc fala o tamanho mínimo e máximo que deseja
export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-gap: ${theme.spacings.medium};
    margin: ${theme.spacings.medium} 0;
  `}
`
