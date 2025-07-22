export function convert(num: number): string {
  if (num % 3 !== 0 && num % 5 !== 0 && num % 7 !== 0) return String(num)

  let result = ''
  if (num % 3 === 0) result += 'Pling'
  if (num % 5 === 0) result += 'Plang'
  if (num % 7 === 0) result += 'Plong'

  return result
}
