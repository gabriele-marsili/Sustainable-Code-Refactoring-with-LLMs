"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump'];
        this.handShakeCommands = (secret & 16)
            ? baseCommands.filter((_, i) => secret & (1 << i)).reverse()
            : baseCommands.filter((_, i) => secret & (1 << i));
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
