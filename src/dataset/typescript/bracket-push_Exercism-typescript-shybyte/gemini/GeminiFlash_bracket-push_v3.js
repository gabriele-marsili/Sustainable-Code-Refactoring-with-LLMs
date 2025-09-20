"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPENING = "{[(";
const CLOSING = "}])";
class BracketPush {
    constructor(input) {
        this.brackets = input;
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
                const popped = stack.pop();
                if (popped !== bracket) {
                    if (CLOSING.indexOf(bracket) === -1)
                        continue;
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
