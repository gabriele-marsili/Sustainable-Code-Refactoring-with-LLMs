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
            [')', '('],
        ]);
        const openBrackets = new Set(['{', '[', '(']);
        for (let i = 0; i < this.input.length; i++) {
            const char = this.input[i];
            if (openBrackets.has(char)) {
                stack.push(char);
            }
            else if (bracketPairs.has(char)) {
                const top = stack.pop();
                if (bracketPairs.get(char) !== top) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
