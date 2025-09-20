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
        const match = /(\d+)\?$/.exec(question);
        if (!match) {
            throw new ArgumentError();
        }
        let result = 0;
        const regex = /([a-z\s]+?)\s+(-?\d+)/g;
        let matches;
        while ((matches = regex.exec(question)) !== null) {
            const operatorWords = matches[1].trim();
            const operand = matches[2];
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
