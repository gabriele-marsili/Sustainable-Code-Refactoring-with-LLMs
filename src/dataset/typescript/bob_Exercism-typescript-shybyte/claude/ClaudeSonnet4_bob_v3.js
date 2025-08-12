"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        if (message.length === 0) {
            return 'Fine. Be that way!';
        }
        if (message.endsWith('?')) {
            return isUpperCaseAndHasAlphabeticChars(message) ? 'Calm down, I know what I\'m doing!' : 'Sure.';
        }
        if (isUpperCaseAndHasAlphabeticChars(message)) {
            return 'Whoa, chill out!';
        }
        return 'Whatever.';
    }
}
function isUpperCaseAndHasAlphabeticChars(s) {
    let hasAlpha = false;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char >= 'A' && char <= 'Z') {
            hasAlpha = true;
        }
        else if (char >= 'a' && char <= 'z') {
            return false;
        }
    }
    return hasAlpha;
}
exports.default = Bob;
