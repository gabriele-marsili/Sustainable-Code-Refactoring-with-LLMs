"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwoFer {
    static twoFer(name = TwoFer.DEFAULT_NAME) {
        return `${TwoFer.MESSAGE_START}${name}${TwoFer.MESSAGE_END}`;
    }
}
TwoFer.DEFAULT_NAME = 'you';
TwoFer.MESSAGE_START = 'One for ';
TwoFer.MESSAGE_END = ', one for me.';
exports.default = TwoFer;
