export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  
  for (const value in old) {
    const numValue = Number(value);
    const letters = old[value];
    
    for (let i = 0; i < letters.length; i++) {
      transformed[letters[i].toLowerCase()] = numValue;
    }
  }
  
  return transformed;
}