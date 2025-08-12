"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        if (message.length === 0) {
            return 'Fine. Be that way!';
        }
        const hasAlpha = /[a-zA-Z]/.test(message);
        if (hasAlpha && message === message.toUpperCase()) {
            return 'Whoa, chill out!';
        }
        if (message.endsWith('?')) {
            return 'Sure.';
        }
        return 'Whatever.';
    }
}
exports.default = Bob;
