export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  const numericValue = Number(key);
  
  for (const key in old) {
    const numericValue = Number(key);
    const letters = old[key];
    
    for (let i = 0; i < letters.length; i++) {
      transformed[letters[i].toLowerCase()] = numericValue;
    }
  }
  
  return transformed;
}