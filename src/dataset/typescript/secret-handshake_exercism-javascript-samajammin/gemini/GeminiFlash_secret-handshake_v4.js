"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const commands = [];
        if (secret & 1)
            commands.push('wink');
        if (secret & 2)
            commands.push('double blink');
        if (secret & 4)
            commands.push('close your eyes');
        if (secret & 8)
            commands.push('jump');
        this.handShakeCommands = (secret & 16) ? commands.reverse() : commands;
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
