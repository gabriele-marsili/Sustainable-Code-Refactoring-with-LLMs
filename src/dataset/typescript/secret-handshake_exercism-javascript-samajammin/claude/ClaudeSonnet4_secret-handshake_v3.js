"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const commandMap = ['wink', 'double blink', 'close your eyes', 'jump'];
        const commands = [];
        for (let i = 0; i < 4; i++) {
            if (secret & (1 << i)) {
                commands.push(commandMap[i]);
            }
        }
        this.handShakeCommands = secret & 16 ? commands.reverse() : commands;
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
