const bracket_pairs = {"{": "}", "[": "]", "(": ")"};

function bracket(brackets) {
  const stack = [];
  const len = brackets.length;
  
  for (let i = 0; i < len; i++) {
    const char = brackets[i];
    const closing = bracket_pairs[char];
    
    if (closing) {
      stack.push(closing);
    } else if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      return false;
    }
  }
  
  return stack.length === 0;
}

export default bracket;