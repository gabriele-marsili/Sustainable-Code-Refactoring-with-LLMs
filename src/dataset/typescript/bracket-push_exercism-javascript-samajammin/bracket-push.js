"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketPush {
    constructor(input) {
        this.input = input;
    }
    isPaired() {
        const stack = [];
        const bracketPairs = {
            '}': '{',
            ']': '[',
            ')': '('
        };
        for (const char of this.input) {
            if (/[{[(]/.test(char)) {
                stack.push(char);
            }
            if (bracketPairs[char] === stack[stack.length - 1]) {
                stack.pop();
            }
            else if (bracketPairs[char]) {
                return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
