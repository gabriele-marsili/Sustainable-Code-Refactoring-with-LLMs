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
            if (this.numberValue & (1 << i)) {
                commands.push(COMMANDS[i]);
            }
        }
        return (this.numberValue & 16) ? commands.reverse() : commands;
    }
}
exports.default = SecretHandshake;
