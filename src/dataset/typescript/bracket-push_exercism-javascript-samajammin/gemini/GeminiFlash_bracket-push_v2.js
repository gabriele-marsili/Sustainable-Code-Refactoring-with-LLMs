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
        const openBrackets = new Set(['{', '[', '(']);
        for (let i = 0; i < this.input.length; i++) {
            const char = this.input[i];
            if (openBrackets.has(char)) {
                stack.push(char);
            }
            else {
                const expectedBracket = bracketPairs[char];
                if (expectedBracket) {
                    if (stack.length === 0 || stack[stack.length - 1] !== expectedBracket) {
                        return false;
                    }
                    stack.pop();
                }
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
