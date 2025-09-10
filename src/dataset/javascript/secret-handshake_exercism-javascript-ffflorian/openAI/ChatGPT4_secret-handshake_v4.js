const availableCommands = ['jump', 'close your eyes', 'double blink', 'wink'];

export function commands(input) {
  const binary = (input & 31).toString(2);
  const result = [];

  for (let i = 0, len = binary.length; i < len; i++) {
    if (binary[len - 1 - i] === '1') {
      if (i === 4) {
        result.reverse();
      } else {
        result.push(availableCommands[i]);
      }
    }
  }

  return result;
}