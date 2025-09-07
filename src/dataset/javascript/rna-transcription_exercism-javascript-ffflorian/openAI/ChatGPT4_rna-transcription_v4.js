export function toRna(DNA) {
  const map = { A: 'U', C: 'G', G: 'C', T: 'A' };
  let result = '';
  for (let i = 0; i < DNA.length; i++) {
    result += map[DNA[i]];
  }
  return result;
}