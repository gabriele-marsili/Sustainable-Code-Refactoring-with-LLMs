"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        let i = 0, len = input.length;
        while (i < len && /\s/.test(input[i]))
            i++;
        if (i === len)
            return 'Fine. Be that way!';
        let end = len - 1;
        while (end >= 0 && /\s/.test(input[end]))
            end--;
        const lastChar = input[end];
        let hasLetter = false, isUpper = true;
        for (let j = i; j <= end; j++) {
            const c = input[j];
            if (/[a-zA-Z]/.test(c)) {
                hasLetter = true;
                if (c !== c.toUpperCase()) {
                    isUpper = false;
                    break;
                }
            }
        }
        const isQuestion = lastChar === '?';
        if (isQuestion && hasLetter && isUpper)
            return "Calm down, I know what I'm doing!";
        if (isQuestion)
            return 'Sure.';
        if (hasLetter && isUpper)
            return 'Whoa, chill out!';
        return 'Whatever.';
    }
}
exports.default = Bob;
