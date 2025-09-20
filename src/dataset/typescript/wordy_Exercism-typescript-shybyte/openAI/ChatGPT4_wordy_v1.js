"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = exports.WordProblem = void 0;
const OPERATORS = {
    'what is': (_x, y) => y,
    plus: (x, y) => x + y,
    minus: (x, y) => x - y,
    'multiplied by': (x, y) => x * y,
    'divided by': (x, y) => x / y,
};
class WordProblem {
    constructor(question) {
        this.question = question.toLowerCase();
    }
    answer() {
        if (!/(\d+)\?$/.test(this.question)) {
            throw new ArgumentError();
        }
        let result = 0;
        const matches = this.question.matchAll(/([a-z\s]+?)\s+(-?\d+)/g);
        for (const [, operatorWords, operand] of matches) {
            const operator = OPERATORS[operatorWords.trim()];
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, +operand);
        }
        return result;
    }
}
exports.WordProblem = WordProblem;
class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!");
    }
}
exports.ArgumentError = ArgumentError;
