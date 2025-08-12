"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(message) {
        // Check for empty/whitespace-only message first (most common case)
        if (!/\S/.test(message)) {
            return 'Fine. Be that way!';
        }
        // Check if message ends with question mark
        if (message.charCodeAt(message.length - 1) === 63) { // 63 is '?'
            return 'Sure.';
        }
        // Check for yelling (contains letters and all uppercase)
        let hasLetter = false;
        let isAllUpper = true;
        for (let i = 0; i < message.length; i++) {
            const code = message.charCodeAt(i);
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) { // A-Z or a-z
                hasLetter = true;
                if (code >= 97 && code <= 122) { // a-z (lowercase)
                    isAllUpper = false;
                    break;
                }
            }
        }
        if (hasLetter && isAllUpper) {
            return 'Whoa, chill out!';
        }
        return 'Whatever.';
    }
}
exports.default = Bob;
