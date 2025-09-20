"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFer = twoFer;
function twoFer(input = 'you') {
    return input === 'you'
        ? 'One for you, one for me.'
        : `One for ${input}, one for me.`;
}
