const bracket_pairs = {"{": "}", "[":"]", "(":")"};
const closing_brackets = new Set(["}", "]", ")"]);

function bracket(brackets) {
	/* checks that bracket syntax is correct */
  const stack = [];
  const len = brackets.length;
  
  for(let i = 0; i < len; i++) {
    const letter = brackets[i];
    const closing = bracket_pairs[letter];
    
    if(closing) {
      stack.push(closing);
    } else if(closing_brackets.has(letter)) {
      if(stack.length === 0 || stack.pop() !== letter) {
        return false;
      }
    } else {
      return false;
    }
  }
  return stack.length === 0;
}

export default bracket;