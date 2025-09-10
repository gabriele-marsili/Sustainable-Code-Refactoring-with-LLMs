type OperatorFunction = (x: number, y: number) => number

const OPERATORS: { [operatorWords: string]: OperatorFunction } = {
    'what is': (_x: number, y: number) => y,
    plus: (x: number, y: number) => x + y,
    minus: (x: number, y: number) => x - y,
    'multiplied by': (x: number, y: number) => x * y,
    'divided by': (x: number, y: number) => x / y
}

export class WordProblem {
    private question: string

    constructor(question: string) {
        this.question = question
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

            if (!operatorWords || !operand) continue;

            const operator = OPERATORS[operatorWords];
            if (!operator) {
                throw new ArgumentError();
            }
            result = operator(result, parseFloat(operand));
        }

        return result;
    }
}

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}