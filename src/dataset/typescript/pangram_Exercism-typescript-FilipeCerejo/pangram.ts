
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string) {
  const lettersSet = new Set<string>();
  
  phrase.split('').forEach(l => {
    if(alphabet.indexOf(l.toLowerCase()) > -1) {
      lettersSet.add(l.toLowerCase());
    }
  })

  return lettersSet.size === alphabet.length;
}
