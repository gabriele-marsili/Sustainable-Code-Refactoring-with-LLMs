export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const transformed: { [key: string]: number } = {};
  
  for (const key in old) {
    const numValue = Number(key);
    const letters = old[key];
    
    for (let i = 0; i < letters.length; i++) {
      transformed[letters[i].toLowerCase()] = numValue;
    }
  }
  
  return transformed;
}