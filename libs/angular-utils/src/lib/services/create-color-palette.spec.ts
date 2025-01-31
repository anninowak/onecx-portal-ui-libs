import { TestBed } from '@angular/core/testing'
import { CreateColorPaletteService } from './create-color-palette'
describe('CreateColorPaletteService', () => {
  let createColorPaletteService: CreateColorPaletteService
  const primaryColor = '#3498db'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateColorPaletteService],
    })
    createColorPaletteService = new CreateColorPaletteService()
  })

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
  // How to execute the test: nx run angular-utils:test --testFile=/add-file-path
  it('should be created', () => {
    expect(createColorPaletteService).toBeTruthy()
  })

  it('should adjust color correctly', () => {
    const primaryColor = cyanColorPalette[500]
    let adjustedColor = createColorPaletteService.adjustColor(primaryColor, 25)
    expect(adjustedColor).toEqual(cyanColorPalette[400])
  })

  it('should create a correct color palette', () => {
    const palette = createColorPaletteService.createPalette(primaryColor)
    expect(palette[0]).toBe('#fcffff')
    expect(palette[50]).toBe('#caffff')
    expect(palette[100]).toBe('#98fcff')
    expect(palette[200]).toBe('#7fe3ff')
    expect(palette[300]).toBe('#66caff')
    expect(palette[400]).toBe('#4db1f4')
    expect(palette[500]).toBe('#3498db')
    expect(palette[600]).toBe('#1b7fc2')
    expect(palette[700]).toBe('#0266a9')
    expect(palette[800]).toBe('#004d90')
    expect(palette[900]).toBe('#003477')
  })
})
