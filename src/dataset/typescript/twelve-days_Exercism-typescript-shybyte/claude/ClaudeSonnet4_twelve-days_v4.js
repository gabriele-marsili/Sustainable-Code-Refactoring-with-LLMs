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
    'a Partridge in a Pear Tree',
];
const ORDINAL_WORDS = [
    'first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];
const VERSE_CACHE = new Map();
class TwelveDays {
    static recite(first, last = first) {
        let result = '';
        for (let i = first; i <= last; i++) {
            result += oneVerse(i);
        }
        return result;
    }
}
exports.default = TwelveDays;
function concatWithCommaOrAnd(gifts) {
    if (gifts.length === 1) {
        return gifts[0];
    }
    const lastGift = gifts[gifts.length - 1];
    let result = '';
    for (let i = 0; i < gifts.length - 1; i++) {
        result += gifts[i];
        if (i < gifts.length - 2) {
            result += ', ';
        }
    }
    return result + ', and ' + lastGift;
}
function oneVerse(n) {
    const cached = VERSE_CACHE.get(n);
    if (cached) {
        return cached;
    }
    const gifts = GIFTS.slice(-n);
    const giftsText = concatWithCommaOrAnd(gifts);
    const verse = `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${giftsText}.\n`;
    VERSE_CACHE.set(n, verse);
    return verse;
}
