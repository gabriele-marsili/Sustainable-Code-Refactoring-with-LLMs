"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        if (message === '')
            return 'Fine. Be that way!';
        if (isUpperCaseAndHasAlphabeticChars(message))
            return 'Whoa, chill out!';
        if (message.endsWith('?'))
            return 'Sure.';
        return 'Whatever.';
    }
}
function isUpperCaseAndHasAlphabeticChars(s) {
    let hasAlpha = false;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= 'a' && c <= 'z')
            return false;
        if (!hasAlpha && c >= 'A' && c <= 'Z')
            hasAlpha = true;
    }
    return hasAlpha;
}
exports.default = Bob;
