"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQuestion = exports.isYell = exports.isEmpty = exports.hey = void 0;
const hey = (message) => {
    const trimmedMessage = message.trim();
    // Pre-calculate flags to avoid redundant computations and multiple function calls
    const isMsgEmpty = trimmedMessage === "";
    const isMsgQuestion = trimmedMessage.endsWith("?");
    const isMsgYell = trimmedMessage.toUpperCase() === trimmedMessage &&
        /[A-Z]/.test(trimmedMessage); // Ensures it's all caps AND contains at least one letter
    if (isMsgEmpty) {
        return `Fine. Be that way!`;
    }
    else if (isMsgQuestion && isMsgYell) {
        return `Calm down, I know what I'm doing!`;
    }
    else if (isMsgQuestion) {
        return "Sure.";
    }
    else if (isMsgYell) {
        return `Whoa, chill out!`;
    }
    else {
        return `Whatever.`;
    }
};
exports.hey = hey;
// These helper functions are no longer directly used in 'hey'
// but their signatures must be preserved as per the requirements.
// They are kept here, but their implementations are simplified
// assuming they would receive an already trimmed string if called externally.
const isEmpty = (message) => {
    return message.trim() === "";
};
exports.isEmpty = isEmpty;
const isYell = (message) => {
    const trimmedMessage = message.trim();
    return (trimmedMessage.toUpperCase() === trimmedMessage &&
        /[A-Z]/.test(trimmedMessage));
};
exports.isYell = isYell;
const isQuestion = (message) => {
    return message.trim().endsWith("?");
};
exports.isQuestion = isQuestion;
