var bracket_pairs = {"{": "}", "[":"]", "(":")"};

function bracket(brackets) {
	/* checks that bracket syntax is correct */
  const stack = [];
  for( let i = 0; i < brackets.length; i++) {
    const letter = brackets[i];
    if( bracket_pairs.hasOwnProperty(letter) ) {
      stack.push(bracket_pairs[letter]);
    } else if (stack.length > 0 && stack[stack.length - 1] === letter) {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.length === 0;
};

export default bracket;