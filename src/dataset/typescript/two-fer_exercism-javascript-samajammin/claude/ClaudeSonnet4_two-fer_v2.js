"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwoFer {
    static twoFer(name = 'you') {
        return name === 'you'
            ? 'One for you, one for me.'
            : `One for ${name}, one for me.`;
    }
}
exports.default = TwoFer;
