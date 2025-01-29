import { Inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CreateColorPaletteService {
  primaryColor: string

  constructor(@Inject('primary500') primary500: string) {
    this.primaryColor = primary500
  }

  // Function to lighten or darken a color
  // color: A string representing the color in hexadecimal format
  // amount: A number indicating how much to lighten or darken the color. Positive values lighten the color, while negative values darken it.
  private adjustColor(color: string, amount: number): string {
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

  public createPalette(): { [key: number]: string } {
    const palette = {
      0: this.adjustColor(this.primaryColor, 200),
      50: this.adjustColor(this.primaryColor, 150),
      100: this.adjustColor(this.primaryColor, 100),
      200: this.adjustColor(this.primaryColor, 75),
      300: this.adjustColor(this.primaryColor, 50),
      400: this.adjustColor(this.primaryColor, 25),
      500: this.primaryColor,
      600: this.adjustColor(this.primaryColor, -25),
      700: this.adjustColor(this.primaryColor, -50),
      800: this.adjustColor(this.primaryColor, -75),
      900: this.adjustColor(this.primaryColor, -100),
    }

    return palette
  }
}

// tested example output:
// : {
//     "0": "#fcffff",
//     "50": "#caffff",
//     "100": "#98fcff",
//     "200": "#7fe3ff",
//     "300": "#66caff",
//     "400": "#4db1f4",
//     "500": "#3498db",
//     "600": "#1b7fc2",
//     "700": "#0266a9",
//     "800": "#004d90",
//     "900": "#003477"
//   }
