export default class BracketPush {
  readonly input: string;

  constructor(input: string) {
    this.input = input;
  }

  isPaired(): boolean {
    const stack: string[] = [];
    const bracketPairs = new Map<string, string>([
      ['}', '{'],
      [']', '['],
      [')', '('],
    ]);
    const openBrackets = new Set(['{', '[', '(']);

    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i];

      if (openBrackets.has(char)) {
        stack.push(char);
      } else if (bracketPairs.has(char)) {
        const top = stack.pop();
        if (bracketPairs.get(char) !== top) {
          return false;
        }
      }
    }

    return stack.length === 0;
  }
}