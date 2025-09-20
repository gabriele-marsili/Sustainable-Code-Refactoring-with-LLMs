"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recite = recite;
const TWELVEDAY = [
    { day: 'first', gift: 'a Partridge in a Pear Tree.' },
    { day: 'second', gift: 'two Turtle Doves, and' },
    { day: 'third', gift: 'three French Hens,' },
    { day: 'fourth', gift: 'four Calling Birds,' },
    { day: 'fifth', gift: 'five Gold Rings,' },
    { day: 'sixth', gift: 'six Geese-a-Laying,' },
    { day: 'seventh', gift: 'seven Swans-a-Swimming,' },
    { day: 'eighth', gift: 'eight Maids-a-Milking,' },
    { day: 'ninth', gift: 'nine Ladies Dancing,' },
    { day: 'tenth', gift: 'ten Lords-a-Leaping,' },
    { day: 'eleventh', gift: 'eleven Pipers Piping,' },
    { day: 'twelfth', gift: 'twelve Drummers Drumming,' },
];
function recite(begin, end) {
    const result = [];
    for (let i = begin - 1; i < end; i++) {
        const gifts = TWELVEDAY.slice(0, i + 1)
            .map((verse) => verse.gift)
            .reverse()
            .join(' ');
        result.push(`On the ${TWELVEDAY[i].day} day of Christmas my true love gave to me: ${gifts}`);
    }
    return result.join('\n') + '\n';
}
