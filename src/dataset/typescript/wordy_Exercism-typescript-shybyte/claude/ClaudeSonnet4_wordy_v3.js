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
const QUESTION_PATTERN = /(\d+)\?$/;
const OPERATOR_PATTERN = /([a-z\s]+?)\s+(-?\d+)/g;
class WordProblem {
    constructor(question) {
        this.question = question.toLowerCase();
    }
    answer() {
        if (!QUESTION_PATTERN.test(this.question)) {
            throw new ArgumentError();
        }
        let result = 0;
        let match;
        while ((match = OPERATOR_PATTERN.exec(this.question)) !== null) {
            const operatorWords = match[1].trim();
            const operator = OPERATORS.get(operatorWords);
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, Number(match[2]));
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
function* getMatches(question, regExp) {
    let matches;
    do {
        matches = regExp.exec(question);
        if (matches) {
            yield matches;
        }
    } while (matches);
}
