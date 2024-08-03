import 'styled-components'
import themes from './theme'

declare module 'styled-components' {
  type ThemeType = typeof themes

  export interface DefaultTheme extends ThemeType { }
}