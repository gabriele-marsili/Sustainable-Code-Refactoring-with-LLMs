"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIFTS = [
    'twelve Drummers Drumming',
    'eleven Pipers Piping',
    'ten Lords-a-Leaping',
    'nine Ladies Dancing',
    'eight Maids-a-Milking',
    'seven Swans-a-Swimming',
    'six Geese-a-Laying',
    'five Gold Rings',
    'four Calling Birds',
    'three French Hens',
    'two Turtle Doves',
    'a Partridge in a Pear Tree'
];
const ORDINAL_WORDS = [
    'first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];
class TwelveDays {
    static recite(first, last = first) {
        let verses = '';
        for (let n = first; n <= last; n++) {
            verses += oneVerse(n);
        }
        return verses;
    }
}
exports.default = TwelveDays;
function concatWithCommaOrAnd(gifts) {
    const len = gifts.length;
    if (len === 1)
        return gifts[0];
    return gifts.slice(0, len - 1).join(', ') + ', and ' + gifts[len - 1];
}
function oneVerse(n) {
    const giftsText = concatWithCommaOrAnd(GIFTS.slice(12 - n));
    return `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${giftsText}.\n`;
}
