"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    const trimmed = message.trim();
    if (trimmed === "") {
        return `Fine. Be that way!`;
    }
    const isYelling = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    const isQuestionAsking = trimmed.endsWith("?");
    if (isQuestionAsking && isYelling) {
        return `Calm down, I know what I'm doing!`;
    }
    if (isQuestionAsking) {
        return "Sure.";
    }
    if (isYelling) {
        return `Whoa, chill out!`;
    }
    return `Whatever.`;
};
exports.hey = hey;
const isEmpty = (message) => {
    return message.trim() === "";
};
const isYell = (message) => {
    return (message.trim().toUpperCase() == message && /[A-Z]/.test(message.trim()));
};
const isQuestion = (message) => {
    return message.trim().substring(message.trim().length - 1) == "?";
};
