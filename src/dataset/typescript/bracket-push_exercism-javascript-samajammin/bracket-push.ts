export default class BracketPush {
  readonly input: string;

  constructor(input: string) {
    this.input = input;
  }

  isPaired(): boolean {
    const stack: string[] = [];
    const bracketPairs: { [key: string]: string } = {
      '}': '{',
      ']': '[',
      ')': '('
    };
    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i];
      if (char === '{' || char === '[' || char === '(') {
        stack.push(char);
      } else if (char === '}' || char === ']' || char === ')') {
        if (stack.length === 0 || bracketPairs[char] !== stack.pop()) {
          return false;
        }
      }
    }

    return stack.length === 0;
  }
}