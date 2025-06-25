type LetterType = { [index: number]: string[] }

const LETTERVALUES: LetterType = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
};

export function score(word: string): number {
  let value = 0;
  if (word) {
    Object.keys(LETTERVALUES).forEach((i: string) => {
      LETTERVALUES[Number(i)].forEach((l: string) => {
        value +=
          (word.match(new RegExp(`${l}`, 'gi'))?.length ?? 0) *
          Number(i);
      });
    });
  }
  return value;
}
