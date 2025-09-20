"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = exports.WordProblem = void 0;
const OPERATORS = {
    'what is': (_x, y) => y,
    plus: (x, y) => x + y,
    minus: (x, y) => x - y,
    'multiplied by': (x, y) => x * y,
    'divided by': (x, y) => x / y
};
class WordProblem {
    constructor(question) {
        this.question = question;
    }
    answer() {
        const question = this.question.toLowerCase();
        const numberMatch = question.match(/(-?\d+)\?$/);
        if (!numberMatch) {
            throw new ArgumentError();
        }
        const parts = question.slice(0, question.length - numberMatch[0].length).split(/([a-z\s]+?)\s*(-?\d+)/).filter(Boolean);
        let result = 0;
        for (let i = 0; i < parts.length; i += 3) {
            const operatorWords = parts[i].trim();
            const operand = parts[i + 1];
            if (!operatorWords || !operand)
                continue;
            const operator = OPERATORS[operatorWords];
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, parseFloat(operand));
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
