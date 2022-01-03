import theme from 'styles/theme'

//inferência de tipos, o theme já tem dados preenchidos
//a gente atribuiu o theme ao Theme e ele inferiu os tipos
type Theme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
