const OPENING = "{[("
const CLOSING = "}])"

export default class BracketPush {
    private readonly brackets: string;

    constructor(input: string) {
        this.brackets = input;
    }

    isPaired(): boolean {
        const stack: string[] = [];
        for (let i = 0; i < this.brackets.length; i++) {
            const bracket = this.brackets[i];
            const openingIndex = OPENING.indexOf(bracket);

            if (openingIndex !== -1) {
                stack.push(CLOSING[openingIndex]);
            } else {
                const popped = stack.pop();
                if (popped !== bracket) {
                    if (CLOSING.indexOf(bracket) === -1) continue;
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
}