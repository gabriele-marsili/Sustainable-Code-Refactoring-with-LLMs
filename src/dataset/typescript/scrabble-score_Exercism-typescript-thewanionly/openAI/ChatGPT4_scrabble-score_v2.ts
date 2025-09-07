const ScrabbleScoring: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
  m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
  y: 4, z: 10
} as const;

type Letter = keyof typeof ScrabbleScoring;

export function score(word: string = ''): number {
  let total = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word.charCodeAt(i) | 32; // Convert to lowercase using bitwise OR
    if (letter >= 97 && letter <= 122) { // Check if it's a valid lowercase letter
      total += ScrabbleScoring[String.fromCharCode(letter) as Letter];
    }
  }
  return total;
}