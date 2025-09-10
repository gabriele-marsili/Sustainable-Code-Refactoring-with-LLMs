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

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}