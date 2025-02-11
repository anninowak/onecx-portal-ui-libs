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
  it('should create a palette with adjusted colors', () => {
    const primaryColor = cyanColorPalette[500]
    const palette = createPalette(primaryColor)
    const testNumbers = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    expect(colorDelta(palette[100], cyanColorPalette[100])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[200], cyanColorPalette[200])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[300], cyanColorPalette[300])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[400], cyanColorPalette[400])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[500], cyanColorPalette[500])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[600], cyanColorPalette[600])).toBeLessThanOrEqual(20)
    expect(colorDelta(palette[700], cyanColorPalette[700])).toBeLessThanOrEqual(20)
  })
})
