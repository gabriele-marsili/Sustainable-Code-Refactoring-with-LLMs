"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandShake {
    constructor(secret) {
        const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
        this.handShakeCommands = actions.filter((_, i) => secret & (1 << i));
        if (secret & 16)
            this.handShakeCommands.reverse();
    }
    commands() {
        return this.handShakeCommands;
    }
}
exports.default = HandShake;
