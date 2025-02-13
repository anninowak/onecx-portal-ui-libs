import {
  ColorAdjustment,
  adjustColor,
  colorDelta,
  createPalette,
  standardColorAdjustment,
} from './create-color-palette'
interface ColorPalette {
  [key: number]: string
}
const cyanColorPalette: ColorPalette = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
}

const redColorPalette: ColorPalette = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
}
const orangeColorPalette: ColorPalette = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  950: '#431407',
}

const greenColorPalette: ColorPalette = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
}

describe('adjustColor', () => {
  it('should lighten the color when amount is positive', () => {
    expect(adjustColor('#000000', 50)).toBe('#323232')
  })

  it('should darken the color when amount is negative', () => {
    expect(adjustColor('#ffffff', -50)).toBe('#cdcdcd')
  })

  it('should handle colors without hash', () => {
    expect(adjustColor('000000', 50)).toBe('323232')
  })

  it('should handle edge cases for color values', () => {
    expect(adjustColor('#ff0000', 300)).toBe('#ffffff')
    expect(adjustColor('#00ff00', -300)).toBe('#000000')
  })
})

describe('createPalette', () => {
  const maximumDifference = 50
  const paletteKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  it('should create a cyan palette with adjusted colors', () => {
    const primaryColor = cyanColorPalette[500]
    const palette = createPalette(primaryColor, standardColorAdjustment)
    paletteKeys.forEach((key: number) => {
      expect(colorDelta(palette[key], cyanColorPalette[key])).toBeLessThanOrEqual(maximumDifference)
    })
  })

  it('should create a red color palette with adjusted colors', () => {
    const primaryColor = redColorPalette[500]
    const palette = createPalette(primaryColor, standardColorAdjustment)
    paletteKeys.forEach((key: number) => {
      expect(colorDelta(palette[key], redColorPalette[key])).toBeLessThanOrEqual(maximumDifference)
    })
  })

  it('should create a red color palette with adjusted colors', () => {
    const primaryColor = redColorPalette[500]
    const palette = createPalette(primaryColor, standardColorAdjustment)
    paletteKeys.forEach((key: number) => {
      expect(colorDelta(palette[key], redColorPalette[key])).toBeLessThanOrEqual(maximumDifference)
    })
  })
  it('should create an orange color palette with adjusted colors', () => {
    const primaryColor = orangeColorPalette[500]
    const palette = createPalette(primaryColor, standardColorAdjustment)

    paletteKeys.forEach((key: number) => {
      expect(colorDelta(palette[key], orangeColorPalette[key])).toBeLessThanOrEqual(maximumDifference)
    })
  })

  it('should create a green color palette with adjusted colors', () => {
    const primaryColor = greenColorPalette[500]
    const palette = createPalette(primaryColor, standardColorAdjustment)

    paletteKeys.forEach((key: number) => {
      expect(colorDelta(palette[key], greenColorPalette[key])).toBeLessThanOrEqual(maximumDifference)
    })
  })
  it('should calculate the euclidic distance correctly', () => {
    expect(colorDelta('#ff0000', '#00ff00')).toBeGreaterThan(100)
  })

  it('should create a custom palette', () => {
    const primaryColor = 'blue'
    const adjustments: ColorAdjustment = {
      50: 210,
      100: 195,
      200: 150,
      300: 98,
      400: 20,
      600: -25,
      700: -65,
      800: -80,
      900: -110,
      950: -140,
    }
    const palette = createPalette(primaryColor, adjustments)
    console.log(palette)
    // TODO: Add the expectation here
  })
})
