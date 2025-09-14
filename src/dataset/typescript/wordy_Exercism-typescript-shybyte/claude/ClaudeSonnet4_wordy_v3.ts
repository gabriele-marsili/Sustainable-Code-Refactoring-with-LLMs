type OperatorFunction = (x: number, y: number) => number

const OPERATORS = new Map<string, OperatorFunction>([
    ['what is', (_x: number, y: number) => y],
    ['plus', (x: number, y: number) => x + y],
    ['minus', (x: number, y: number) => x - y],
    ['multiplied by', (x: number, y: number) => x * y],
    ['divided by', (x: number, y: number) => x / y]
])

const QUESTION_PATTERN = /(\d+)\?$/
const OPERATOR_PATTERN = /([a-z\s]+?)\s+(-?\d+)/g

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

        while ((match = OPERATOR_PATTERN.exec(this.question)) !== null) {
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

function* getMatches(question: string, regExp: RegExp) {
    let matches
    do {
        matches = regExp.exec(question)
        if (matches) {
            yield matches
        }
    } while (matches)
}