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
        if (!/(\d+)\?$/.test(question)) {
            throw new ArgumentError();
        }
        let result = 0;
        const matches = getMatches(question, /([a-z\s]+?)\s+(-?\d+)/g);
        for (const [_, operatorWords, operand] of matches) {
            const operator = OPERATORS[operatorWords.trim()];
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
function* getMatches(question, regExp) {
    let matches;
    do {
        matches = regExp.exec(question);
        if (matches) {
            yield matches;
        }
    } while (matches);
}
