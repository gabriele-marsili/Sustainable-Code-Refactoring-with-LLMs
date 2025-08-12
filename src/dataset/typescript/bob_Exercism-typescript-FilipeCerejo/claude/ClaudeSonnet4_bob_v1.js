"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
function hey(message) {
    const trimmedMessage = message.trim();
    if (trimmedMessage === '')
        return 'Fine. Be that way!';
    const isQuestion = trimmedMessage.endsWith('?');
    const isShouting = trimmedMessage === trimmedMessage.toUpperCase() && /[A-Z]/.test(trimmedMessage);
    if (isQuestion && isShouting)
        return "Calm down, I know what I'm doing!";
    if (isShouting)
        return 'Whoa, chill out!';
    if (isQuestion)
        return 'Sure.';
    return 'Whatever.';
}
