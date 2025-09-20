"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BRACKET_MAP = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
]);
const OPENING = new Set(BRACKET_MAP.keys());
const CLOSING = new Set(BRACKET_MAP.values());
class BracketPush {
    constructor(input) {
        this.brackets = Array.from(input).filter((c) => OPENING.has(c) || CLOSING.has(c));
    }
    isPaired() {
        const stack = [];
        for (const bracket of this.brackets) {
            if (OPENING.has(bracket)) {
                stack.push(BRACKET_MAP.get(bracket));
            }
            else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
