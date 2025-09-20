"use strict";
/**
 * This stub is provided to make it straightforward to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFer = twoFer;
function twoFer(input = 'you') {
    return input === 'you' ? 'One for you, one for me.' : `One for ${input}, one for me.`;
}
