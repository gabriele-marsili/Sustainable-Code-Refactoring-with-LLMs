function encode(string) {
  let encodedString = "";
  let count = 1;

  for (let i = 0; i < string.length; i++) {
    if (i + 1 < string.length && string[i] === string[i + 1]) {
      count++;
    } else {
      encodedString += (count > 1 ? count : "") + string[i];
      count = 1;
    }
  }

  return encodedString;
}

function decode(string) {
  let decodedString = "";
  let i = 0;

  while (i < string.length) {
    let numStr = "";
    while (i < string.length && /\d/.test(string[i])) {
      numStr += string[i];
      i++;
    }

    const count = numStr === "" ? 1 : parseInt(numStr);
    const char = string[i];

    decodedString += char.repeat(count);
    i++;
  }

  return decodedString;
}

export { encode, decode };