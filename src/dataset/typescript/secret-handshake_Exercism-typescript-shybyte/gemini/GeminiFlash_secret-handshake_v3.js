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
        this.numberValue = n;
    }
    commands() {
        const result = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if ((this.numberValue >> i) & 1) {
                result.push(COMMANDS[i]);
            }
        }
        if ((this.numberValue >> 4) & 1) {
            return result.reverse();
        }
        return result;
    }
}
exports.default = SecretHandshake;
