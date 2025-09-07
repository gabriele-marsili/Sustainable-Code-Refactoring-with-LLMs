const bracket_pairs = { "{": "}", "[": "]", "(": ")" };

function bracket(brackets) {
  const stack = [];
  for (const letter of brackets) {
    if (bracket_pairs[letter]) {
      stack.push(bracket_pairs[letter]);
    } else if (stack.pop() !== letter) {
      return false;
    }
  }
  return stack.length === 0;
}

export default bracket;