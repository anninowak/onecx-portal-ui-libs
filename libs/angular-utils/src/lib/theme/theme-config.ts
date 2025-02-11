import { adjustColor } from '../utils/create-color-palette'

interface ThemeVariables {
  [key: string]: {
    [key: string]: string
  }
}

export default class ThemeConfig {
  constructor(private themeVariables: ThemeVariables | undefined) {}

  getConfig() {
    return {
      semantic: {
        primary: {
          50: adjustColor((this.themeVariables as any)['general']['primary-color'], 230),
          100: adjustColor((this.themeVariables as any)['general']['primary-color'], 195),
          200: adjustColor((this.themeVariables as any)['general']['primary-color'], 150),
          300: adjustColor((this.themeVariables as any)['general']['primary-color'], 98),
          400: adjustColor((this.themeVariables as any)['general']['primary-color'], 20),
          500: (this.themeVariables as any)['general']['primary-color'],
          600: adjustColor((this.themeVariables as any)['general']['primary-color'], -25),
          700: adjustColor((this.themeVariables as any)['general']['primary-color'], -65),
          800: adjustColor((this.themeVariables as any)['general']['primary-color'], -80),
          900: adjustColor((this.themeVariables as any)['general']['primary-color'], -110),
          950: adjustColor((this.themeVariables as any)['general']['primary-color'], -140),
        },
        colorScheme: {
          light: {
            primary: {
              50: adjustColor((this.themeVariables as any)['general']['primary-color'], 230),
              100: adjustColor((this.themeVariables as any)['general']['primary-color'], 195),
              200: adjustColor((this.themeVariables as any)['general']['primary-color'], 150),
              300: adjustColor((this.themeVariables as any)['general']['primary-color'], 98),
              400: adjustColor((this.themeVariables as any)['general']['primary-color'], 20),
              500: (this.themeVariables as any)['general']['primary-color'],
              600: adjustColor((this.themeVariables as any)['general']['primary-color'], -25),
              700: adjustColor((this.themeVariables as any)['general']['primary-color'], -65),
              800: adjustColor((this.themeVariables as any)['general']['primary-color'], -80),
              900: adjustColor((this.themeVariables as any)['general']['primary-color'], -110),
              950: adjustColor((this.themeVariables as any)['general']['primary-color'], -140),
            },
            text: {
              color: (this.themeVariables as any)['general']['text-color'],
              hoverColor: (this.themeVariables as any)['general']['text-secondary-color'],
            },
            content: {
              background: (this.themeVariables as any)['general']['content-bg-color'],
              hoverBackground: (this.themeVariables as any)['general']['hover-bg-color'],
            },
            list: {
              option: {
                selectedColor: (this.themeVariables as any)['general']['primary-color'],
                selectedFocusColor: (this.themeVariables as any)['general']['primary-color'],
              },
            },
          },
        },
      },
    }
  }
}
