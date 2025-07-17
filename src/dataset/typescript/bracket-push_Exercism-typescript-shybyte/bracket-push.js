"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPENING = "{[(";
const CLOSING = "}])";
const ALL_BRACKETS = OPENING + CLOSING;
class BracketPush {
    constructor(input) {
        this.brackets = input
            .split('')
            .filter((c) => ALL_BRACKETS.includes(c));
    }
    isPaired() {
        const stack = [];
        for (const bracket of this.brackets) {
            const bracketIndex = OPENING.indexOf(bracket);
            if (bracketIndex >= 0) {
                stack.push(CLOSING[bracketIndex]);
            }
            else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
