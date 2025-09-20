"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketPush {
    constructor(input) {
        this.input = input;
    }
    isPaired() {
        const stack = [];
        const bracketPairs = new Map([
            ['}', '{'],
            [']', '['],
            [')', '(']
        ]);
        for (const char of this.input) {
            if (bracketPairs.has(char)) {
                if (stack.pop() !== bracketPairs.get(char)) {
                    return false;
                }
            }
            else if (bracketPairs.values().has(char)) {
                stack.push(char);
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
