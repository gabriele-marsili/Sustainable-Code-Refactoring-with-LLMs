const bracket_pairs = {"{": "}", "[": "]", "(": ")"};

function bracket(brackets) {
  const stack = [];
  
  for (let i = 0; i < brackets.length; i++) {
    const char = brackets[i];
    
    if (char in bracket_pairs) {
      stack.push(bracket_pairs[char]);
    } else if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      return false;
    }
  }
  
  return stack.length === 0;
}

export default bracket;