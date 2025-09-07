export default class BracketPush {
  readonly input: string;

  constructor(input: string) {
    this.input = input;
  }

  isPaired(): boolean {
    const stack: string[] = [];
    let stackTop = -1;
    
    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i];
      
      if (char === '{' || char === '[' || char === '(') {
        stack[++stackTop] = char;
      } else if (char === '}' || char === ']' || char === ')') {
        if (stackTop === -1) return false;
        
        const expected = stack[stackTop--];
        if ((char === '}' && expected !== '{') ||
            (char === ']' && expected !== '[') ||
            (char === ')' && expected !== '(')) {
          return false;
        }
      }
    }

    return stackTop === -1;
  }
}