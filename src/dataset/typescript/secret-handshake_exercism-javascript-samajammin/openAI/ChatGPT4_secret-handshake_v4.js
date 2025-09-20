"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump'];
        this.handShakeCommands = (secret & 16 ? baseCommands.reverse() : baseCommands)
            .filter((_, index) => secret & (1 << index));
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
