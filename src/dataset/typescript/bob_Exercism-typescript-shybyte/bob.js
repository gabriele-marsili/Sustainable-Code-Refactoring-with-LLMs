"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        switch (true) {
            case message.length === 0:
                return 'Fine. Be that way!';
            case isUpperCaseAndHasAlphabeticChars(message):
                return 'Whoa, chill out!';
            case message.endsWith('?'):
                return 'Sure.';
            default:
                return 'Whatever.';
        }
    }
}
function isUpperCaseAndHasAlphabeticChars(s) {
    return s.toUpperCase() === s && s !== s.toLowerCase();
}
exports.default = Bob;
