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
    let song = { song: '', gifts: [] };
    TWELVEDAY.slice(0, end).forEach((verse, idx) => {
        song.gifts.unshift(verse.gift);
        if (idx >= begin - 1) {
            song.song += `On the ${TWELVEDAY[idx].day} day of Christmas my true love gave to me: ${song.gifts.join(' ')}\n`;
        }
    });
    return song.song;
}
