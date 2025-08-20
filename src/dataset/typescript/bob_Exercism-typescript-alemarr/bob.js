"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    // Pre-process the message once to avoid redundant string operations
    // across multiple checks. This significantly reduces CPU cycles,
    // memory allocations, and thus energy consumption.
    const trimmedMessage = message.trim();
    const upperTrimmedMessage = trimmedMessage.toUpperCase();
    // Evaluate conditions once using the pre-processed strings.
    // The helper functions are now optimized to accept these pre-processed
    // values, eliminating redundant trims, uppercasing, and substring operations
    // within their own bodies.
    const msgIsEmpty = isEmpty(trimmedMessage);
    const msgIsQuestion = isQuestion(trimmedMessage);
    const msgIsYell = isYell(trimmedMessage, upperTrimmedMessage);
    switch (true) {
        case msgIsEmpty:
            return `Fine. Be that way!`;
        case msgIsQuestion && msgIsYell:
            return `Calm down, I know what I'm doing!`;
        case msgIsQuestion:
            return "Sure.";
        case msgIsYell:
            return `Whoa, chill out!`;
        default:
            return `Whatever.`;
    }
};
exports.hey = hey;
// Internal helper functions. Their signatures are optimized to accept
// pre-processed strings, as they are not exported and thus not part
// of the module's external interface. This enhances performance and efficiency.
const isEmpty = (trimmedMessage) => {
    return trimmedMessage === "";
};
const isYell = (trimmedMessage, upperTrimmedMessage) => {
    // A message is considered a yell if:
    // 1. Its uppercase version is identical to its original (trimmed) version,
    //    meaning all existing letters are uppercase.
    // 2. It contains at least one uppercase letter (e.g., "123" is not a yell).
    return (upperTrimmedMessage === trimmedMessage && /[A-Z]/.test(trimmedMessage));
};
const isQuestion = (trimmedMessage) => {
    // Using `endsWith` is generally more efficient and readable than
    // `substring(length - 1)` for checking the last character.
    return trimmedMessage.endsWith("?");
};
