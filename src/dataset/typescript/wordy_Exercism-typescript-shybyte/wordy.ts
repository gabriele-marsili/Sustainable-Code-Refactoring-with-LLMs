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
        const question = this.question.toLowerCase()
        if (!/(\d+)\?$/.test(question)) {
            throw new ArgumentError()
        }

        let result = 0
        const matches = getMatches(question, /([a-z\s]+?)\s+(-?\d+)/g)
        for (const [_, operatorWords, operand] of matches) {
            const operator = OPERATORS[operatorWords.trim()]
            if (!operator) {
                throw new ArgumentError()
            }
            result = operator(result, parseFloat(operand))
        }

        return result
    }
}

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}

function* getMatches(question: string, regExp: RegExp) {
    let matches
    do {
        matches = regExp.exec(question)
        if (matches) {
            yield  matches
        }
    } while (matches)
}
