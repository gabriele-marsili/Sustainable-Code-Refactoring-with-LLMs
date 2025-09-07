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
  let count = "";

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i]))) {
      count += string[i];
    } else {
      const repeatCount = count ? parseInt(count) : 1;
      decodedString += string[i].repeat(repeatCount);
      count = "";
    }
  }

  return decodedString;
}

export { encode, decode };