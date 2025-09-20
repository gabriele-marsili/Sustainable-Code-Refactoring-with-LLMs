"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BRACKET_PAIRS = {
    '{': '}',
    '[': ']',
    '(': ')',
};
class BracketPush {
    constructor(input) {
        this.brackets = input.replace(/[^{}\[\]()]/g, '');
    }
    isPaired() {
        const stack = [];
        for (const bracket of this.brackets) {
            if (BRACKET_PAIRS[bracket]) {
                stack.push(BRACKET_PAIRS[bracket]);
            }
            else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
