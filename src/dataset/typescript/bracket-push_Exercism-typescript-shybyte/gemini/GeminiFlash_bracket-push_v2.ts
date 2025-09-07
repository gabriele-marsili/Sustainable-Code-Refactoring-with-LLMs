const OPENING = "{[(";
const CLOSING = "}])";

export default class BracketPush {
    private readonly brackets: string;

    constructor(input: string) {
        this.brackets = input.replace(/[^\{\[\(\}\]\)]/g, '');
    }

    isPaired(): boolean {
        const stack: string[] = [];
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i];
            const openingIndex = OPENING.indexOf(bracket);

            if (openingIndex !== -1) {
                stack.push(CLOSING[openingIndex]);
            } else {
                if (stack.length === 0 || stack.pop() !== bracket) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }
}