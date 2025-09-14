type OperatorFunction = (x: number, y: number) => number

const OPERATORS = new Map<string, OperatorFunction>([
    ['what is', (_x: number, y: number) => y],
    ['plus', (x: number, y: number) => x + y],
    ['minus', (x: number, y: number) => x - y],
    ['multiplied by', (x: number, y: number) => x * y],
    ['divided by', (x: number, y: number) => x / y]
])

export class WordProblem {
    private question: string

    constructor(question: string) {
        this.question = question.toLowerCase()
    }

    answer() {
        if (!this.question.endsWith('?') || !/\d+\?$/.test(this.question)) {
            throw new ArgumentError()
        }

        let result = 0
        const regex = /([a-z\s]+?)\s+(-?\d+)/g
        let match: RegExpExecArray | null
        
        while ((match = regex.exec(this.question)) !== null) {
            const operatorWords = match[1].trim()
            const operator = OPERATORS.get(operatorWords)
            if (!operator) {
                throw new ArgumentError()
            }
            result = operator(result, parseInt(match[2], 10))
        }

        return result
    }
}

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}