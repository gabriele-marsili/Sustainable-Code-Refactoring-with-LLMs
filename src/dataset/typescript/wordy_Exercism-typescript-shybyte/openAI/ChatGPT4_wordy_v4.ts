type OperatorFunction = (x: number, y: number) => number;

const OPERATORS: Record<string, OperatorFunction> = {
    'what is': (_x, y) => y,
    plus: (x, y) => x + y,
    minus: (x, y) => x - y,
    'multiplied by': (x, y) => x * y,
    'divided by': (x, y) => x / y,
};

export class WordProblem {
    private question: string;

    constructor(question: string) {
        this.question = question.toLowerCase();
    }

    answer(): number {
        if (!this.question.endsWith('?')) {
            throw new ArgumentError();
        }

        const matches = [...this.question.matchAll(/([a-z\s]+?)\s+(-?\d+)/g)];
        if (matches.length === 0) {
            throw new ArgumentError();
        }

        return matches.reduce((result, [, operatorWords, operand], index) => {
            const operator = OPERATORS[operatorWords.trim()];
            if (!operator) {
                throw new ArgumentError();
            }
            return operator(index === 0 ? 0 : result, parseFloat(operand));
        }, 0);
    }
}

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!");
    }
}