const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const binary = input >>> 0;
  const result = [];

  if (binary & 1) {
    result.push(availableCommands[0]);
  }
  if (binary & 2) {
    result.push(availableCommands[1]);
  }
  if (binary & 4) {
    result.push(availableCommands[2]);
  }
  if (binary & 8) {
    result.push(availableCommands[3]);
  }

  if (binary & 16) {
    return result.reverse();
  }

  return result;
}