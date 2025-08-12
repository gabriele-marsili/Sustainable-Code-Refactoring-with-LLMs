"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '')
            return 'Fine. Be that way!';
        const endsWithQuestion = trimmed.charCodeAt(trimmed.length - 1) === 63;
        const hasLetter = /[a-zA-Z]/.test(trimmed);
        const isShout = hasLetter && trimmed === trimmed.toUpperCase();
        if (endsWithQuestion && isShout)
            return "Calm down, I know what I'm doing!";
        if (endsWithQuestion)
            return 'Sure.';
        if (isShout)
            return 'Whoa, chill out!';
        return 'Whatever.';
    }
}
exports.default = Bob;
