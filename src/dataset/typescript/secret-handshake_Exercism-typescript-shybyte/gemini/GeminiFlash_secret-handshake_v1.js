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
        const commands = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if ((this.numberValue >> i) & 1) {
                commands.push(COMMANDS[i]);
            }
        }
        if ((this.numberValue >> 4) & 1) {
            return commands.reverse();
        }
        return commands;
    }
}
exports.default = SecretHandshake;
