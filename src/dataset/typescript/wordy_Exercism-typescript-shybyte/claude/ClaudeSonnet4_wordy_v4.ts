type OperatorFunction = (x: number, y: number) => number

const OPERATORS: ReadonlyMap<string, OperatorFunction> = new Map([
    ['what is', (_x: number, y: number) => y],
    ['plus', (x: number, y: number) => x + y],
    ['minus', (x: number, y: number) => x - y],
    ['multiplied by', (x: number, y: number) => x * y],
    ['divided by', (x: number, y: number) => x / y]
])

const QUESTION_PATTERN = /(\d+)\?$/
const OPERATION_PATTERN = /([a-z\s]+?)\s+(-?\d+)/g

export class WordProblem {
    private question: string

    constructor(question: string) {
        this.question = question.toLowerCase()
    }

    answer() {
        if (!QUESTION_PATTERN.test(this.question)) {
            throw new ArgumentError()
        }

        let result = 0
        let match: RegExpExecArray | null

        while ((match = OPERATION_PATTERN.exec(this.question)) !== null) {
            const operatorWords = match[1].trim()
            const operator = OPERATORS.get(operatorWords)
            
            if (!operator) {
                throw new ArgumentError()
            }
            
            result = operator(result, Number(match[2]))
        }

        return result
    }
}

export class ArgumentError extends Error {
    constructor() {
        super("Illegal Argument!")
    }
}