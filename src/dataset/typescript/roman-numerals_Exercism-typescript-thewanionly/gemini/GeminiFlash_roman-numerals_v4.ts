const RomanNumeralMap: { [key: number]: string } = {
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

const values = Object.keys(RomanNumeralMap)
  .map(Number)
  .sort((a, b) => b - a)

export const toRoman = (num: number): string => {
  let result = ''
  let remaining = num

  for (const value of values) {
    while (remaining >= value) {
      result += RomanNumeralMap[value]
      remaining -= value
    }
  }

  return result
}