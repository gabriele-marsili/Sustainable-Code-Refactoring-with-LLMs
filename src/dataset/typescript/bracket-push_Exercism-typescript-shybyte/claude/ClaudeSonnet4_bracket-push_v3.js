"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPENING = "{[(";
const CLOSING = "}])";
const BRACKET_MAP = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
]);
const CLOSING_SET = new Set(CLOSING);
class BracketPush {
    constructor(input) {
        this.brackets = [];
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (BRACKET_MAP.has(char) || CLOSING_SET.has(char)) {
                this.brackets.push(char);
            }
        }
    }
    isPaired() {
        const stack = [];
        for (const bracket of this.brackets) {
            const expectedClosing = BRACKET_MAP.get(bracket);
            if (expectedClosing) {
                stack.push(expectedClosing);
            }
            else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
