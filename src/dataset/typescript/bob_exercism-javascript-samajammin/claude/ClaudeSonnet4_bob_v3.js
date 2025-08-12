"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(message) {
        if (!/\S/.test(message)) {
            return 'Fine. Be that way!';
        }
        const hasUpperCase = /[A-Z]/.test(message);
        if (hasUpperCase && message === message.toUpperCase()) {
            return message.endsWith('?') ? 'Calm down, I know what I\'m doing!' : 'Whoa, chill out!';
        }
        if (message.endsWith('?')) {
            return 'Sure.';
        }
        return 'Whatever.';
    }
}
exports.default = Bob;
