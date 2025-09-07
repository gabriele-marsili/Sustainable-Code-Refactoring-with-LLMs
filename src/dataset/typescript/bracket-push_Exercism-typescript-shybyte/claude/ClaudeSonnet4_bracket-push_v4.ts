const OPENING = "{[("
const CLOSING = "}])"
const BRACKET_MAP = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
])
const CLOSING_SET = new Set('}])')

export default class BracketPush {
    brackets: string[]

    constructor(input: string) {
        const result: string[] = []
        for (let i = 0; i < input.length; i++) {
            const char = input[i]
            if (char === '{' || char === '[' || char === '(' || char === '}' || char === ']' || char === ')') {
                result.push(char)
            }
        }
        this.brackets = result
    }

    isPaired() {
        const stack: string[] = []
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i]
            const closingBracket = BRACKET_MAP.get(bracket)
            if (closingBracket) {
                stack.push(closingBracket)
            } else if (stack.pop() !== bracket) {
                return false
            }
        }
        return stack.length === 0
    }
}