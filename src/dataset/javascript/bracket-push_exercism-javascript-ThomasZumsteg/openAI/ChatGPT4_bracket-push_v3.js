const bracket_pairs = { "{": "}", "[": "]", "(": ")" };

function bracket(brackets) {
  const stack = [];
  for (const char of brackets) {
    if (char in bracket_pairs) {
      stack.push(bracket_pairs[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}

export default bracket;