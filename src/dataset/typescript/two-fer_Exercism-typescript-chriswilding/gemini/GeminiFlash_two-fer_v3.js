"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoFer = twoFer;
function twoFer(name = 'you') {
    const template = 'One for ';
    const suffix = ', one for me.';
    return template + name + suffix;
}
