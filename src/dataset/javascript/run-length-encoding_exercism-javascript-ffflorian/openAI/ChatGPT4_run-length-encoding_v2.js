export function encode(input) {
  let result = '';
  let count = 1;
  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++;
    } else {
      result += (count > 1 ? count : '') + input[i - 1];
      count = 1;
    }
  }
  return result;
}

export function decode(input) {
  let result = '';
  let i = 0;
  while (i < input.length) {
    let num = '';
    while (i < input.length && !isNaN(input[i])) {
      num += input[i];
      i++;
    }
    const count = parseInt(num, 10) || 1;
    result += input[i].repeat(count);
    i++;
  }
  return result;
}