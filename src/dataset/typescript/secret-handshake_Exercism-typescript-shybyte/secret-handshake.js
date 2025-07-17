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
        const isBitTrue = (bit) => this.numberValue & 1 << bit;
        const commands = COMMANDS.filter((_, i) => isBitTrue(i));
        return isBitTrue(4) ? commands.reverse() : commands;
    }
}
exports.default = SecretHandshake;
