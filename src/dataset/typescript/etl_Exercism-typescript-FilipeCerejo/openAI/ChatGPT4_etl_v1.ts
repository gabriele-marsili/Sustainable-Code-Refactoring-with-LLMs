export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  for (const [value, letters] of Object.entries(old)) {
    for (const letter of letters) {
      transformed[letter.toLowerCase()] = +value;
    }
  }
  return transformed;
}