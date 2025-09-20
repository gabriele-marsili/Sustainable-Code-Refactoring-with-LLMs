"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketPush {
    constructor(input) {
        this.brackets = input.replace(/[^\{\[\(\}\]\)]/g, '');
    }
    isPaired() {
        const stack = [];
        const openingBrackets = "{[(";
        const closingBrackets = "}])";
        const bracketMap = {
            '{': '}',
            '[': ']',
            '(': ')',
        };
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i];
            if (openingBrackets.includes(bracket)) {
                stack.push(bracketMap[bracket]);
            }
            else if (closingBrackets.includes(bracket)) {
                if (stack.length === 0 || stack.pop() !== bracket) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
