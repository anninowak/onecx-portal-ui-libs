import { Inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CreateColorPaletteService {
  // Function to lighten or darken a color
  // color: A string representing the color in hexadecimal format
  // amount: A number indicating how much to lighten or darken the color. Positive values lighten the color, while negative values darken it.
  adjustColor(color: string, amount: number): string {
    let colorBeginsWithHash = false

    if (color[0] === '#') {
      // checks if the color starts with a # , so a correct heaxdecimal value
      color = color.slice(1)
      colorBeginsWithHash = true
    }

    let num = parseInt(color, 16) // convert hex to rgb using base 16

    // adjustment of red, green and blue components

    let r = (num >> 16) + amount // red adjustment
    if (r > 255) r = 255
    else if (r < 0) r = 0

    let g = ((num >> 8) & 0x00ff) + amount // green adjustment
    if (g > 255) g = 255
    else if (g < 0) g = 0

    let b = (num & 0x0000ff) + amount // blue adjustment
    if (b > 255) b = 255
    else if (b < 0) b = 0

    return (colorBeginsWithHash ? '#' : '') + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
  }

  public createPalette(primaryColor: string): { [key: number]: string } {
    const palette = {
      0: this.adjustColor(primaryColor, 200),
      50: this.adjustColor(primaryColor, 150),
      100: this.adjustColor(primaryColor, 100),
      200: this.adjustColor(primaryColor, 75),
      300: this.adjustColor(primaryColor, 50),
      400: this.adjustColor(primaryColor, 25),
      500: primaryColor,
      600: this.adjustColor(primaryColor, -25),
      700: this.adjustColor(primaryColor, -50),
      800: this.adjustColor(primaryColor, -75),
      900: this.adjustColor(primaryColor, -100),
      950: this.adjustColor(primaryColor, -125),
    }

    return palette
  }
}
