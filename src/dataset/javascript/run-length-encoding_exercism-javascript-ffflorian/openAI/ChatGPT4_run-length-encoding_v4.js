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
    let num = 0;
    while (i < input.length && input[i] >= '0' && input[i] <= '9') {
      num = num * 10 + (input[i].charCodeAt(0) - 48);
      i++;
    }
    const char = input[i++];
    result += char.repeat(num || 1);
  }
  return result;
}