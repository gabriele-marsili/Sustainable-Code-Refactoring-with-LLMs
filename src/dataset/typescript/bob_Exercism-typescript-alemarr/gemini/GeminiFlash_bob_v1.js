"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    // Pre-calculate results of helper functions to avoid redundant calls
    // and their associated internal string operations (like message.trim()).
    const isEmptyMessage = isEmpty(message);
    const isQuestionMessage = isQuestion(message);
    const isYellMessage = isYell(message);
    if (isEmptyMessage) {
        return `Fine. Be that way!`;
    }
    if (isQuestionMessage && isYellMessage) {
        return `Calm down, I know what I'm doing!`;
    }
    if (isQuestionMessage) {
        return "Sure.";
    }
    if (isYellMessage) {
        return `Whoa, chill out!`;
    }
    return `Whatever.`;
};
exports.hey = hey;
const isEmpty = (message) => {
    return message.trim() === "";
};
const isYell = (message) => {
    // Trim the message once within this function to avoid repeated calls
    const trimmedMessage = message.trim();
    // Check if the trimmed message is all uppercase and contains at least one letter.
    // The /[A-Z]/.test() check is crucial to differentiate "123" (not a yell) from "ABC" (a yell).
    return trimmedMessage.toUpperCase() === trimmedMessage && /[A-Z]/.test(trimmedMessage);
};
const isQuestion = (message) => {
    // Trim the message once within this function to avoid repeated calls
    const trimmedMessage = message.trim();
    // Use endsWith for more efficient and readable check of the last character.
    return trimmedMessage.endsWith("?");
};
