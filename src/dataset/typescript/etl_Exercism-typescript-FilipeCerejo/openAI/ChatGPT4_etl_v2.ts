export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  for (const [key, letters] of Object.entries(old)) {
    const value = Number(key);
    for (const letter of letters) {
      transformed[letter.toLowerCase()] = value;
    }
  }
  return transformed;
}