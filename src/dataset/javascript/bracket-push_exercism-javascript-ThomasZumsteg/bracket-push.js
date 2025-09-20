const bracket_pairs = new Map([["{", "}"], ["[", "]"], ["(", ")"]]);

function bracket(brackets) {
  const stack = [];
  for (const letter of brackets) {
    if (bracket_pairs.has(letter)) {
      stack.push(bracket_pairs.get(letter));
    } else if (stack.length && stack[stack.length - 1] === letter) {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.length === 0;
}

export default bracket;