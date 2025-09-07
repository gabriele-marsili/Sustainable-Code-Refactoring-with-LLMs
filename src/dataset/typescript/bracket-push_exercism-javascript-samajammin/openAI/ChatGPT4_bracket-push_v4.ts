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
      [')', '(']
    ]);

    for (const char of this.input) {
      if (bracketPairs.has(char)) {
        if (stack.pop() !== bracketPairs.get(char)) {
          return false;
        }
      } else if (bracketPairs.values().has(char)) {
        stack.push(char);
      }
    }

    return stack.length === 0;
  }
}