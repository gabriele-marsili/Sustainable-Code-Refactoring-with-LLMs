const OPENING = "{[("
const CLOSING = "}])"
const BRACKET_MAP = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
]);
const CLOSING_SET = new Set(CLOSING);

export default class BracketPush {
    brackets: string[]

    constructor(input: string) {
        this.brackets = []
        for (let i = 0; i < input.length; i++) {
            const char = input[i]
            if (BRACKET_MAP.has(char) || CLOSING_SET.has(char)) {
                this.brackets.push(char)
            }
        }
    }

    isPaired() {
        const stack = []
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i]
            const expectedClosing = BRACKET_MAP.get(bracket)
            if (expectedClosing) {
                stack.push(expectedClosing)
            } else if (stack.length === 0 || stack.pop() !== bracket) {
                return false
            }
        }
        return stack.length === 0
    }
}