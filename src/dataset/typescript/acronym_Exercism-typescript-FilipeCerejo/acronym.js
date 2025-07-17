"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    return (phrase.match(/[A-Z]+[a-z]*|[a-z]+/g) || [])
        .map((w) => w[0].toUpperCase())
        .join('');
}
