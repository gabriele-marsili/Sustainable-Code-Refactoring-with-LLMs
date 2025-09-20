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
        const match = question.match(/(-?\d+)\?$/);
        if (!match) {
            throw new ArgumentError();
        }
        const parts = question.replace(/\?/g, '').split(' ');
        let result = parseFloat(parts[2]);
        let i = 3;
        while (i < parts.length - 1) {
            const operatorWords = parts[i];
            const operand = parseFloat(parts[i + 1]);
            const operator = OPERATORS[operatorWords];
            if (!operator) {
                const combinedOperator = `${operatorWords} ${parts[i + 1]}`;
                const combinedOperatorFunc = OPERATORS[combinedOperator];
                if (combinedOperatorFunc) {
                    result = combinedOperatorFunc(result, parseFloat(parts[i + 2]));
                    i += 3;
                    continue;
                }
                throw new ArgumentError();
            }
            result = operator(result, operand);
            i += 2;
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
