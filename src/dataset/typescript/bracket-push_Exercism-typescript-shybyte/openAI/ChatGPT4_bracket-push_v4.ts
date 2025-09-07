const BRACKET_MAP = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
]);
const OPENING = new Set(BRACKET_MAP.keys());
const CLOSING = new Set(BRACKET_MAP.values());

export default class BracketPush {
    private brackets: string[];

    constructor(input: string) {
        this.brackets = Array.from(input).filter((c) => OPENING.has(c) || CLOSING.has(c));
    }

    isPaired(): boolean {
        const stack: string[] = [];
        for (const bracket of this.brackets) {
            if (OPENING.has(bracket)) {
                stack.push(BRACKET_MAP.get(bracket)!);
            } else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}