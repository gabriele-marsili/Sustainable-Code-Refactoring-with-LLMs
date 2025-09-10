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

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}