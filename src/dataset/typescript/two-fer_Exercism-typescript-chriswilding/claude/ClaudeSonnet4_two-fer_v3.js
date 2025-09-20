"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFer = twoFer;
function twoFer(name = 'you') {
    return name === 'you' ? 'One for you, one for me.' : `One for ${name}, one for me.`;
}
