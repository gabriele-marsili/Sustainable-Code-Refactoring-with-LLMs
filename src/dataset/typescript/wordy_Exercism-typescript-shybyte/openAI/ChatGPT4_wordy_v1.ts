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

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!");
    }
}