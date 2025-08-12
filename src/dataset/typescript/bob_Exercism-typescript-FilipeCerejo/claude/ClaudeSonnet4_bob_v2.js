"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
function hey(message) {
    const trimmed = message.trim();
    if (!trimmed)
        return 'Fine. Be that way!';
    const isQuestion = trimmed.endsWith('?');
    const isShouting = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    if (isQuestion && isShouting)
        return "Calm down, I know what I'm doing!";
    if (isQuestion)
        return 'Sure.';
    if (isShouting)
        return 'Whoa, chill out!';
    return 'Whatever.';
}
