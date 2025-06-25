// function parse(phrase: string): string {
//   let acronym = '';
//   let matches = phrase
//     .substring(
//       0,
//       phrase.indexOf(':') >= 0 ? phrase.indexOf(':') : phrase.length
//     )
//     .match(/\w{1,}/g);
//   if (matches) {
//     acronym = matches
//       .map((m) => {
//         let capitals = m.replace(/[a-z]/g, '');
//         if (!capitals) capitals = m[0].toUpperCase();
//         return capitals;
//       })
//       .join('');
//   }
//   return acronym;
// }

export function parse(phrase: string): string {
  return (phrase.match(/[A-Z]+[a-z]*|[a-z]+/g) || [])
    .map((w) => w[0].toUpperCase())
    .join('');
}