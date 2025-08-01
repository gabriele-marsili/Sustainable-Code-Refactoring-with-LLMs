"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '')
            return 'Fine. Be that way!';
        const question = trimmed.endsWith('?');
        const shout = !(trimmed === trimmed.toLowerCase()) && trimmed === trimmed.toUpperCase();
        if (question && shout)
            return "Calm down, I know what I'm doing!";
        if (question)
            return 'Sure.';
        if (shout)
            return 'Whoa, chill out!';
        return 'Whatever.';
    }
}
exports.default = Bob;
