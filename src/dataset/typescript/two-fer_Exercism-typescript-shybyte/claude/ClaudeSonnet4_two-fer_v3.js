"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwoFer {
    static twoFer(name = 'you') {
        return this.template + name + this.suffix;
    }
}
TwoFer.template = 'One for ';
TwoFer.suffix = ', one for me.';
exports.default = TwoFer;
