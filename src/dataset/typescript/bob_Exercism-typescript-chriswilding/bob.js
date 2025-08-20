"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (!trimmed)
            return 'Fine. Be that way!';
        const lastChar = trimmed.charAt(trimmed.length - 1);
        const isQuestion = lastChar === '?';
        let hasLetter = false;
        let isShouting = true;
        for (let i = 0; i < trimmed.length; i++) {
            const char = trimmed.charAt(i);
            if (char >= 'a' && char <= 'z') {
                isShouting = false;
                hasLetter = true;
                break;
            }
            if (char >= 'A' && char <= 'Z')
                hasLetter = true;
        }
        if (isQuestion && isShouting && hasLetter)
            return "Calm down, I know what I'm doing!";
        if (isQuestion)
            return 'Sure.';
        if (isShouting && hasLetter)
            return 'Whoa, chill out!';
        return 'Whatever.';
    }
}
exports.default = Bob;
