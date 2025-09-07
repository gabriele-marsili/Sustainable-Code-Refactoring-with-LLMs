export function encode(input) {
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

export function decode(input) {
  let decoded = "";
  let numStr = "";
  for (let i = 0; i < input.length; i++) {
    if (/\d/.test(input[i])) {
      numStr += input[i];
    } else {
      const repeats = numStr === "" ? 1 : parseInt(numStr, 10);
      decoded += input[i].repeat(repeats);
      numStr = "";
    }
  }
  return decoded;
}