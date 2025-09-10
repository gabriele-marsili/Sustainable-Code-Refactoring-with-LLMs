const RomanNumeral: { [key: number]: string } = {
  1: 'I',
  4: 'IV',
  5: 'V',
  9: 'IX',
  10: 'X',
  40: 'XL',
  50: 'L',
  90: 'XC',
  100: 'C',
  400: 'CD',
  500: 'D',
  900: 'CM',
  1000: 'M'
}

export const toRoman = (num: number): string => {
  const romanStr: string[] = []
  const keys = Object.keys(RomanNumeral)
    .map(Number)
    .reverse()

  for (const key of keys) {
    while (num >= key) {
      romanStr.push(RomanNumeral[key])
      num -= key
    }
  }

  return romanStr.join('')
}