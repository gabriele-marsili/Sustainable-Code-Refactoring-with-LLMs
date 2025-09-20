"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump'];
        const commands = baseCommands.filter((_, i) => secret & (1 << i));
        this.handShakeCommands = secret & 16 ? commands.reverse() : commands;
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
