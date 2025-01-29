import { TestBed } from '@angular/core/testing'
import { CreateColorPaletteService } from './create-color-palette'
describe('CreateColorPaletteService', () => {
  // How to execute the test: nx run angular-utils:test --testFile=/add-file-path
  let createColorPaletteService: CreateColorPaletteService
  const primary500 = '#3498db'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: 'primary500', useValue: primary500 }, CreateColorPaletteService],
    })
    createColorPaletteService = TestBed.inject(CreateColorPaletteService)
  })

  it('should be created', () => {
    expect(createColorPaletteService).toBeTruthy()
  })
  it('should adjust color correctly', () => {
    const color = '#3498db'
    const amount = 50
    // TODO: test here the adjustColor function
    // expect(adjustedColor).toBe('#'); // Expected adjusted color
  })

  it('should create a correct color palette', () => {
    const palette = createColorPaletteService.createPalette()
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
