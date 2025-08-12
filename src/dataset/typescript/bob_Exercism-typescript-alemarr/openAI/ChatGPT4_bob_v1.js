"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = void 0;
const hey = (message) => {
    const trimmed = message.trim();
    if (trimmed === "") {
        return "Fine. Be that way!";
    }
    const isYelling = trimmed.toUpperCase() === trimmed && /[A-Z]/.test(trimmed);
    const isAsking = trimmed.endsWith("?");
    if (isAsking && isYelling) {
        return "Calm down, I know what I'm doing!";
    }
    if (isAsking) {
        return "Sure.";
    }
    if (isYelling) {
        return "Whoa, chill out!";
    }
    return "Whatever.";
};
exports.hey = hey;
const isEmpty = (message) => {
    return message.trim() === "";
};
const isYell = (message) => {
    const trimmed = message.trim();
    return trimmed.toUpperCase() === trimmed && /[A-Z]/.test(trimmed);
};
const isQuestion = (message) => {
    const trimmed = message.trim();
    return trimmed.endsWith("?");
};
