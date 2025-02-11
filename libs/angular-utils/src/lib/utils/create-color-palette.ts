// color: A string representing the color in hexadecimal format
// amount: A number indicating how much to lighten or darken the color. Positive values lighten the color, while negative values darken it.
export function adjustColor(color: string, amount: number): string {
  let colorBeginsWithHash = false

  if (color[0] === '#') {
    color = color.slice(1)
    colorBeginsWithHash = true
  }

  let num = parseInt(color, 16)

  let r = (num >> 16) + amount
  if (r > 255) r = 255
  else if (r < 0) r = 0

  let g = ((num >> 8) & 0x00ff) + amount
  if (g > 255) g = 255
  else if (g < 0) g = 0

  let b = (num & 0x0000ff) + amount
  if (b > 255) b = 255
  else if (b < 0) b = 0

  return (colorBeginsWithHash ? '#' : '') + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}

export function createPalette(primaryColor: string): { [key: number]: string } {
  const palette = {
    50: adjustColor(primaryColor, 275),
    100: adjustColor(primaryColor, 205),
    200: adjustColor(primaryColor, 170),
    300: adjustColor(primaryColor, 90),
    400: adjustColor(primaryColor, 20),
    500: primaryColor,
    600: adjustColor(primaryColor, -25),
    700: adjustColor(primaryColor, -50),
    800: adjustColor(primaryColor, -75),
    900: adjustColor(primaryColor, -100),
    950: adjustColor(primaryColor, -125),
  }

  return palette
}

// Calculates the Euclidean distance between two colors in RGB space
export function colorDelta(color1: string, color2: string): number {
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let color = hex.startsWith('#') ? hex.slice(1) : hex
    let bigint = parseInt(color, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255
    return { r, g, b }
  }

  let rgb1 = hexToRgb(color1)
  let rgb2 = hexToRgb(color2)

  // Calculate the Euclidean distance
  let delta = Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2))

  return delta
}
