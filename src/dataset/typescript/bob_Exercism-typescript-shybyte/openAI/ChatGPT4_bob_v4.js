"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        if (message === '')
            return 'Fine. Be that way!';
        const hasLetters = /[a-zA-Z]/.test(message);
        const isShouting = hasLetters && message === message.toUpperCase();
        if (isShouting)
            return 'Whoa, chill out!';
        if (message.endsWith('?'))
            return 'Sure.';
        return 'Whatever.';
    }
}
exports.default = Bob;
