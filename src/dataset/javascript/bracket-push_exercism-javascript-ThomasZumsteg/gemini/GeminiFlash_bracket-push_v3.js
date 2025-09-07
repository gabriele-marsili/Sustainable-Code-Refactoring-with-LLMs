var bracket_pairs = {"{": "}", "[":"]", "(":")"};

function bracket(brackets) {
  const stack = [];
  for (let i = 0; i < brackets.length; i++) {
    const letter = brackets[i];
    const closingBracket = bracket_pairs[letter];

    if (closingBracket) {
      stack.push(closingBracket);
    } else if (stack.length > 0 && stack[stack.length - 1] === letter) {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.length === 0;
};

export default bracket;