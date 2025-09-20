"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketPush {
    constructor(input) {
        this.input = input;
    }
    isPaired() {
        const stack = [];
        for (let i = 0; i < this.input.length; i++) {
            const char = this.input[i];
            if (char === '{' || char === '[' || char === '(') {
                stack.push(char);
            }
            else if (char === '}') {
                if (stack.pop() !== '{')
                    return false;
            }
            else if (char === ']') {
                if (stack.pop() !== '[')
                    return false;
            }
            else if (char === ')') {
                if (stack.pop() !== '(')
                    return false;
            }
        }
        return stack.length === 0;
    }
}
exports.default = BracketPush;
