"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketPush {
    constructor(input) {
        this.input = input;
    }
    isPaired() {
        const stack = [];
        for (const char of this.input) {
            if (char in BracketPush.bracketPairs) {
                if (stack.pop() !== BracketPush.bracketPairs[char]) {
                    return false;
                }
            }
            else if (/[{[(]/.test(char)) {
                stack.push(char);
            }
        }
        return stack.length === 0;
    }
}
BracketPush.bracketPairs = {
    '}': '{',
    ']': '[',
    ')': '('
};
exports.default = BracketPush;
