export const transform = (s) => {
  let scrabble = {}
  for (let score in s) {
    for (let l in s[score]) {
      scrabble[s[score][l].toLowerCase()] = parseInt(score)
    }
  }
  return scrabble
};
