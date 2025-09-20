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
const QUESTION_REGEX = /(\d+)\?$/;
const OPERATOR_REGEX = /([a-z\s]+?)\s+(-?\d+)/g;
class WordProblem {
    constructor(question) {
        this.question = question.toLowerCase();
    }
    answer() {
        if (!QUESTION_REGEX.test(this.question)) {
            throw new ArgumentError();
        }
        let result = 0;
        let match;
        while ((match = OPERATOR_REGEX.exec(this.question)) !== null) {
            const operatorWords = match[1].trim();
            const operator = OPERATORS[operatorWords];
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, +match[2]);
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
