"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPENING = "{[(";
const CLOSING = "}])";
class BracketPush {
    constructor(input) {
        this.brackets = input.replace(/[^\{\[\(\}\]\)]/g, '');
    }
    isPaired() {
        const stack = [];
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i];
            const openingIndex = OPENING.indexOf(bracket);
            if (openingIndex !== -1) {
                stack.push(CLOSING[openingIndex]);
            }
            else {
                if (stack.length === 0 || stack.pop() !== bracket) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
