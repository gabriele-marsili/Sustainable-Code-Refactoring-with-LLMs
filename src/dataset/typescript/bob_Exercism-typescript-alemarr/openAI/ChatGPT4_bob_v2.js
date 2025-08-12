"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    const trimmed = message.trim();
    const isEmpty = trimmed === "";
    const isQuestion = trimmed.endsWith("?");
    const isYell = /[A-Z]/.test(trimmed) && trimmed === trimmed.toUpperCase();
    if (isEmpty)
        return "Fine. Be that way!";
    if (isQuestion && isYell)
        return "Calm down, I know what I'm doing!";
    if (isQuestion)
        return "Sure.";
    if (isYell)
        return "Whoa, chill out!";
    return "Whatever.";
};
exports.hey = hey;
