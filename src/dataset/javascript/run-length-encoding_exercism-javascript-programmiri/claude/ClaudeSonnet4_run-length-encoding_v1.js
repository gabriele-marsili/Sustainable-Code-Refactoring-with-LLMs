function encode(string) {
  return string.replace(/(.)\1+/g, (match, char) => `${match.length}${char}`);
}

function decode(string) {
  return string.replace(/(\d+)(\w|\s)/g, (match, count, char) => char.repeat(parseInt(count)));
}

export { encode, decode };