"use strict";
/**
 * This stub is provided to make it straightforward to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFer = twoFer;
function twoFer(name = 'you') {
    const recipient = name || 'you';
    return `One for ${recipient}, one for me.`;
}
