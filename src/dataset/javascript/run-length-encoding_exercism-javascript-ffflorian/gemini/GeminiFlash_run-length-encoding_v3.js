export function encode(input) {
  let result = '';
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    if (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
    } else {
      result += (count > 1 ? count : '') + input[i];
      count = 1;
    }
  }
  return result;
}

export function decode(input) {
  let result = '';
  let numStr = '';
  for (let i = 0; i < input.length; i++) {
    if (!isNaN(parseInt(input[i], 10))) {
      numStr += input[i];
    } else {
      const repeats = numStr === '' ? 1 : parseInt(numStr, 10);
      result += input[i].repeat(repeats);
      numStr = '';
    }
  }
  return result;
}