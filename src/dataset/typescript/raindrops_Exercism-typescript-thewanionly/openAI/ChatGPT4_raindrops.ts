export function convert(num: number): string {
  const parts: string[] = []

  if (num % 3 === 0) parts.push('Pling')
  if (num % 5 === 0) parts.push('Plang')
  if (num % 7 === 0) parts.push('Plong')

  return parts.length ? parts.join('') : String(num)
}
