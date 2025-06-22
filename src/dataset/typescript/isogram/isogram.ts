export function isIsogram(phrase: string): boolean {
  let letter_map = (phrase.match(/\w/g) || [])
    .map((w) => w.toLowerCase())
    .reduce((acc: {[a: string]: number}, cur: string) => {
      if (acc[cur]) {
        acc[cur]++;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});
  return Object.keys(letter_map).every((k) => letter_map[k] === 1);
}

