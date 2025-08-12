"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    const trimmed = message.trim();
    const isEmptyMsg = trimmed === "";
    const isYellMsg = trimmed !== "" && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    const isQuestionMsg = trimmed.endsWith("?");
    if (isEmptyMsg)
        return "Fine. Be that way!";
    if (isYellMsg && isQuestionMsg)
        return "Calm down, I know what I'm doing!";
    if (isQuestionMsg)
        return "Sure.";
    if (isYellMsg)
        return "Whoa, chill out!";
    return "Whatever.";
};
exports.hey = hey;
const isEmpty = (message) => {
    return message.trim() === "";
};
const isYell = (message) => {
    const trimmed = message.trim();
    return trimmed !== "" && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
};
const isQuestion = (message) => {
    return message.trim().endsWith("?");
};
