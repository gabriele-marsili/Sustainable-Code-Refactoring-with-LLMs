export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  for (const value in old) {
    if (Object.hasOwn(old, value)) {
      const letters = old[value];
      const numericValue = Number(value);
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toLowerCase();
        transformed[letter] = numericValue;
      }
    }
  }
  return transformed;
}