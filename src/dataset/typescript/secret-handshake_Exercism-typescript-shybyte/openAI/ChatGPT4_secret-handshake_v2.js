"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
];
class SecretHandshake {
    constructor(n) {
        this.numberValue = n & 31; // Mask to only keep relevant bits (0-4)
    }
    commands() {
        const result = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if (this.numberValue & (1 << i)) {
                result.push(COMMANDS[i]);
            }
        }
        return (this.numberValue & 16) ? result.reverse() : result;
    }
}
exports.default = SecretHandshake;
