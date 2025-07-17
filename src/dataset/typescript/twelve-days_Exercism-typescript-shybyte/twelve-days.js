"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIFTS = ['twelve Drummers Drumming',
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
    'a Partridge in a Pear Tree',
];
const ORDINAL_WORDS = ['first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'];
class TwelveDays {
    static recite(first, last = first) {
        return [...Array(last + 1).keys()]
            .slice(first, last + 1)
            .map(oneVerse)
            .join('');
    }
}
exports.default = TwelveDays;
function concatWithCommaOrAnd(gifts) {
    if (gifts.length === 1) {
        return gifts[0];
    }
    return gifts.slice(0, -1).join(', ') + ', and ' + gifts[gifts.length - 1];
}
function oneVerse(n) {
    const giftsText = concatWithCommaOrAnd(GIFTS.slice(-n));
    return `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${giftsText}.\n`;
}
