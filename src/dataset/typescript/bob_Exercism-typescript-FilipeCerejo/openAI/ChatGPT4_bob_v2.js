"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
function hey(message) {
    const trimmed = message.trim();
    if (trimmed === '')
        return 'Fine. Be that way!';
    const isQuestion = trimmed.charAt(trimmed.length - 1) === '?';
    const hasLetters = /[a-z]/i.test(trimmed);
    const isShouting = hasLetters && trimmed === trimmed.toUpperCase();
    if (isShouting && isQuestion)
        return "Calm down, I know what I'm doing!";
    if (isShouting)
        return 'Whoa, chill out!';
    if (isQuestion)
        return 'Sure.';
    return 'Whatever.';
}
