export function toRna(DNA) {
  let result = '';
  for (let i = 0; i < DNA.length; i++) {
    const char = DNA[i];
    result += char === 'A' ? 'U' : 
              char === 'C' ? 'G' : 
              char === 'G' ? 'C' : 'A';
  }
  return result;
}