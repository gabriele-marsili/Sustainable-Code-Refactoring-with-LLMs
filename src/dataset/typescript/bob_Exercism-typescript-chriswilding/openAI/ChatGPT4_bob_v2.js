"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        let i = 0, end = input.length - 1;
        while (i <= end && input.charCodeAt(i) <= 32)
            i++;
        while (end >= i && input.charCodeAt(end) <= 32)
            end--;
        if (i > end)
            return 'Fine. Be that way!';
        let hasLetter = false, isUpper = true;
        for (let j = i; j <= end; j++) {
            const code = input.charCodeAt(j);
            if (code >= 65 && code <= 90)
                hasLetter = true;
            else if (code >= 97 && code <= 122) {
                hasLetter = true;
                isUpper = false;
            }
        }
        const isQuestion = input.charAt(end) === '?';
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
