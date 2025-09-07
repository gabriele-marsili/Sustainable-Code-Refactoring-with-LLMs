const BRACKET_PAIRS: Record<string, string> = { '{': '}', '[': ']', '(': ')' };
const OPENING = new Set(Object.keys(BRACKET_PAIRS));
const CLOSING = new Set(Object.values(BRACKET_PAIRS));

export default class BracketPush {
    private brackets: string[];

    constructor(input: string) {
        this.brackets = Array.from(input).filter((c) => OPENING.has(c) || CLOSING.has(c));
    }

    isPaired(): boolean {
        const stack: string[] = [];
        for (const bracket of this.brackets) {
            if (OPENING.has(bracket)) {
                stack.push(BRACKET_PAIRS[bracket]);
            } else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}