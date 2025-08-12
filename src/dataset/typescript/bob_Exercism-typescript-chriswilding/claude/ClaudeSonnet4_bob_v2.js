"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '')
            return 'Fine. Be that way!';
        const lastChar = trimmed[trimmed.length - 1];
        const question = lastChar === '?';
        let hasLetter = false;
        let hasLowerCase = false;
        for (let i = 0; i < trimmed.length; i++) {
            const char = trimmed[i];
            if (char >= 'A' && char <= 'Z') {
                hasLetter = true;
            }
            else if (char >= 'a' && char <= 'z') {
                hasLetter = true;
                hasLowerCase = true;
                break;
            }
        }
        const shout = hasLetter && !hasLowerCase;
        if (question && shout)
            return "Calm down, I know what I'm doing!";
        if (question)
            return 'Sure.';
        if (shout)
            return 'Whoa, chill out!';
        return 'Whatever.';
    }
}
exports.default = Bob;
