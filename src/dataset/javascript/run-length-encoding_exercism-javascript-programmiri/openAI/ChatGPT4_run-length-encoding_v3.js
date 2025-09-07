function encode(string) {
  return string.replace(/(.)\1+/g, (match, char) => `${match.length}${char}`);
}

function decode(string) {
  return string.replace(/(\d+)(\w|\s)/g, (_, count, char) => char.repeat(Number(count)));
}

export { encode, decode };