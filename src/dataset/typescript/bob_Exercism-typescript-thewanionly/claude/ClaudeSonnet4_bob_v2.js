"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
const BobResponse = [
    'Whatever.',
    'Sure.',
    'Whoa, chill out!',
    `Calm down, I know what I'm doing!`,
    'Fine. Be that way!'
];
function hey(message) {
    const trimmed = message.trim();
    if (!trimmed) {
        return BobResponse[4]; // 'Fine. Be that way!'
    }
    const isQuestion = trimmed.endsWith('?');
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
    if (isYelling && isQuestion) {
        return BobResponse[3]; // `Calm down, I know what I'm doing!`
    }
    if (isYelling) {
        return BobResponse[2]; // 'Whoa, chill out!'
    }
    if (isQuestion) {
        return BobResponse[1]; // 'Sure.'
    }
    return BobResponse[0]; // 'Whatever.'
}
