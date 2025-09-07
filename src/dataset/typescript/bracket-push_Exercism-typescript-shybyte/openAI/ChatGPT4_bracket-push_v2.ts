const BRACKET_PAIRS: Record<string, string> = {
    '{': '}',
    '[': ']',
    '(': ')',
};

export default class BracketPush {
    private brackets: string;

    constructor(input: string) {
        this.brackets = input.replace(/[^{}\[\]()]/g, '');
    }

    isPaired(): boolean {
        const stack: string[] = [];
        for (const bracket of this.brackets) {
            if (BRACKET_PAIRS[bracket]) {
                stack.push(BRACKET_PAIRS[bracket]);
            } else if (stack.pop() !== bracket) {
                return false;
            }
        }
        return stack.length === 0;
    }
}