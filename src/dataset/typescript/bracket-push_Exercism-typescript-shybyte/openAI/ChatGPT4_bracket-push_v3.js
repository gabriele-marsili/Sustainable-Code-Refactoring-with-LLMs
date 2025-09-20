"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BRACKET_PAIRS = { '{': '}', '[': ']', '(': ')' };
const OPENING = new Set(Object.keys(BRACKET_PAIRS));
const CLOSING = new Set(Object.values(BRACKET_PAIRS));
class BracketPush {
    constructor(input) {
        this.brackets = Array.from(input).filter((c) => OPENING.has(c) || CLOSING.has(c));
    }
    isPaired() {
        const stack = [];
        for (const bracket of this.brackets) {
            if (OPENING.has(bracket)) {
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
