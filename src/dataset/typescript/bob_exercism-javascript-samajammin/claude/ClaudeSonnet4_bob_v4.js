"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(message) {
        if (!/\S/.test(message)) {
            return 'Fine. Be that way!';
        }
        if (message.endsWith('?')) {
            return 'Sure.';
        }
        if (/[A-Z]/.test(message) && message === message.toUpperCase()) {
            return 'Whoa, chill out!';
        }
        return 'Whatever.';
    }
}
exports.default = Bob;
