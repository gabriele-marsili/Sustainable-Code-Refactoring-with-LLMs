"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = exports.WordProblem = void 0;
const OPERATORS = new Map([
    ['what is', (_x, y) => y],
    ['plus', (x, y) => x + y],
    ['minus', (x, y) => x - y],
    ['multiplied by', (x, y) => x * y],
    ['divided by', (x, y) => x / y]
]);
class WordProblem {
    constructor(question) {
        this.question = question.toLowerCase();
    }
    answer() {
        if (!this.question.endsWith('?') || !/\d+\?$/.test(this.question)) {
            throw new ArgumentError();
        }
        let result = 0;
        const regex = /([a-z\s]+?)\s+(-?\d+)/g;
        let match;
        while ((match = regex.exec(this.question)) !== null) {
            const operatorWords = match[1].trim();
            const operator = OPERATORS.get(operatorWords);
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, parseInt(match[2], 10));
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
