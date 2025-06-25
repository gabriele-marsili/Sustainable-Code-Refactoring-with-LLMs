export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  let transformed: { [key: string]: number } = {};
  Object.keys(old).forEach((value) => {
    old[value].forEach((letter) => {
      transformed[letter.toLowerCase()] = Number(value);
    });
  });
  return transformed;
}
