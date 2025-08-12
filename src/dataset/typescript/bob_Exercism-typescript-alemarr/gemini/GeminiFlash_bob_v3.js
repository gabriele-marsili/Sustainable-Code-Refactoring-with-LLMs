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
    // This function is already efficient as `trim()` on short or empty strings is optimized.
    return message.trim() === "";
};
const isYell = (message) => {
    // Optimize by calling `trim()` only once.
    // Preserve original functionality: `message.trim().toUpperCase() == message` ensures
    // the original string (including any whitespace) must exactly match its trimmed and uppercased version.
    // This means the input must not have leading/trailing whitespace and must already be uppercase.
    const trimmedMessage = message.trim();
    return (trimmedMessage.toUpperCase() === message &&
        /[A-Z]/.test(trimmedMessage));
};
const isQuestion = (message) => {
    // Optimize by calling `trim()` only once and using direct character access.
    // Avoids `substring()` which creates a new string object, reducing memory allocation and CPU cycles.
    const trimmedMessage = message.trim();
    return (trimmedMessage.length > 0 &&
        trimmedMessage[trimmedMessage.length - 1] === "?");
};
