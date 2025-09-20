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
        const bits = this.numberValue & 0x1F; // Mask to 5 bits only
        for (let i = 0; i < 4; i++) {
            if (bits & (1 << i)) {
                commands.push(COMMANDS[i]);
            }
        }
        return bits & 16 ? commands.reverse() : commands;
    }
}
exports.default = SecretHandshake;
