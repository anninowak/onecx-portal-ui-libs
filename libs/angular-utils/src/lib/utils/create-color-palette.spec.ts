import { adjustColor, colorDelta, createPalette } from './create-color-palette'
const cyanColorPalette = {
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

const redColorPalette = {
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
const orangeColorPalette = {
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

const greenColorPalette = {
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
  it('should create a cyan palette with adjusted colors', () => {
    const primaryColor = cyanColorPalette[500]
    const palette = createPalette(primaryColor)
    const maximumDifference = 30
    const testNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    expect(colorDelta(palette[50], cyanColorPalette[50])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[100], cyanColorPalette[100])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[200], cyanColorPalette[200])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[300], cyanColorPalette[300])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[400], cyanColorPalette[400])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[500], cyanColorPalette[500])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[600], cyanColorPalette[600])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[700], cyanColorPalette[700])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[800], cyanColorPalette[800])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[900], cyanColorPalette[900])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[950], cyanColorPalette[950])).toBeLessThanOrEqual(maximumDifference)
  })

  it('should create a red color palette with adjusted colors', () => {
    const primaryColor = redColorPalette[500]
    const palette = createPalette(primaryColor)
    const maximumDifference = 50
    expect(colorDelta(palette[50], redColorPalette[50])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[100], redColorPalette[100])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[200], redColorPalette[200])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[300], redColorPalette[300])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[400], redColorPalette[400])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[500], redColorPalette[500])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[600], redColorPalette[600])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[700], redColorPalette[700])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[800], redColorPalette[800])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[900], redColorPalette[900])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[950], redColorPalette[950])).toBeLessThanOrEqual(maximumDifference)
  })
  it('should create an orange color palette with adjusted colors', () => {
    const primaryColor = orangeColorPalette[500]
    const palette = createPalette(primaryColor)
    const maximumDifference = 50
    expect(colorDelta(palette[50], orangeColorPalette[50])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[100], orangeColorPalette[100])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[200], orangeColorPalette[200])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[300], orangeColorPalette[300])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[400], orangeColorPalette[400])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[500], orangeColorPalette[500])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[600], orangeColorPalette[600])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[700], orangeColorPalette[700])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[800], orangeColorPalette[800])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[900], orangeColorPalette[900])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[950], orangeColorPalette[950])).toBeLessThanOrEqual(maximumDifference)
  })

  it('should create a green color palette with adjusted colors', () => {
    const primaryColor = greenColorPalette[500]
    const palette = createPalette(primaryColor)
    const maximumDifference = 50
    expect(colorDelta(palette[50], greenColorPalette[50])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[100], greenColorPalette[100])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[200], greenColorPalette[200])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[300], greenColorPalette[300])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[400], greenColorPalette[400])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[500], greenColorPalette[500])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[600], greenColorPalette[600])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[700], greenColorPalette[700])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[800], greenColorPalette[800])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[900], greenColorPalette[900])).toBeLessThanOrEqual(maximumDifference)
    expect(colorDelta(palette[950], greenColorPalette[950])).toBeLessThanOrEqual(maximumDifference)
  })
})
