export default class BracketPush {
    private readonly brackets: string;

    constructor(input: string) {
        this.brackets = input.replace(/[^\{\[\(\}\]\)]/g, '');
    }

    isPaired(): boolean {
        const stack: string[] = [];
        const openingBrackets = "{[(";
        const closingBrackets = "}])";
        const bracketMap: { [key: string]: string } = {
            '{': '}',
            '[': ']',
            '(': ')',
        };

        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i];

            if (openingBrackets.includes(bracket)) {
                stack.push(bracketMap[bracket]);
            } else if (closingBrackets.includes(bracket)) {
                if (stack.length === 0 || stack.pop() !== bracket) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }
}