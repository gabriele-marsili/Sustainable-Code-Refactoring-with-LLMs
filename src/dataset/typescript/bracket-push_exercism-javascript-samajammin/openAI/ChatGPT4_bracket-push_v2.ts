export default class BracketPush {
  private static readonly bracketPairs: Record<string, string> = {
    '}': '{',
    ']': '[',
    ')': '('
  };

  constructor(private readonly input: string) {}

  isPaired(): boolean {
    const stack: string[] = [];
    for (const char of this.input) {
      if (char in BracketPush.bracketPairs) {
        if (stack.pop() !== BracketPush.bracketPairs[char]) {
          return false;
        }
      } else if (/[{[(]/.test(char)) {
        stack.push(char);
      }
    }
    return stack.length === 0;
  }
}