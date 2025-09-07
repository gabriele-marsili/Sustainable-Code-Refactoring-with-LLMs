export function encode(input: string) {
  let encoded = "";
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    if (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
    } else {
      encoded += (count > 1 ? count : "") + input[i];
      count = 1;
    }
  }
  return encoded;
}

export function decode(input: string) {
  let decoded = "";
  let i = 0;
  while (i < input.length) {
    let numStr = "";
    while (i < input.length && /\d/.test(input[i])) {
      numStr += input[i];
      i++;
    }
    const char = input[i];
    const count = numStr === "" ? 1 : parseInt(numStr);
    decoded += char.repeat(count);
    i++;
  }
  return decoded;
}