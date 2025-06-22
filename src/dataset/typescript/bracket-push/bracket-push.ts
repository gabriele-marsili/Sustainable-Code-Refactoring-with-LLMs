const OPENING = "{[("
const CLOSING = "}])"
const ALL_BRACKETS = OPENING + CLOSING;

export default class BracketPush {
    brackets: string[]

    constructor(input: string) {
        this.brackets = input
            .split('')
            .filter((c) => ALL_BRACKETS.includes(c))
    }

    isPaired() {
        const stack = []
        for (const bracket of this.brackets) {
            const bracketIndex = OPENING.indexOf(bracket)
            if (bracketIndex >= 0) {
                stack.push(CLOSING[bracketIndex])
            } else if (stack.pop() !== bracket) {
                return false
            }
        }
        return stack.length === 0
    }
}