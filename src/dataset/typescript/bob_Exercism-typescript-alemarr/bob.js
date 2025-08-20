"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    switch (true) {
        case isEmpty(message):
            return `Fine. Be that way!`;
        case isQuestion(message) && isYell(message):
            return `Calm down, I know what I'm doing!`;
        case isQuestion(message):
            return "Sure.";
        case isYell(message):
            return `Whoa, chill out!`;
        default:
            return `Whatever.`;
    }
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
