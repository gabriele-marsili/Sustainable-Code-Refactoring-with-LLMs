export function toRna(DNA) {
  let result = '';
  for (let i = 0; i < DNA.length; i++) {
    switch (DNA[i]) {
      case 'A': result += 'U'; break;
      case 'C': result += 'G'; break;
      case 'G': result += 'C'; break;
      case 'T': result += 'A'; break;
    }
  }
  return result;
}