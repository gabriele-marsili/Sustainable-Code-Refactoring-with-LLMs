const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const result = [];

  if (input & 1) {
    result.push(availableCommands[0]);
  }
  if (input & 2) {
    result.push(availableCommands[1]);
  }
  if (input & 4) {
    result.push(availableCommands[2]);
  }
  if (input & 8) {
    result.push(availableCommands[3]);
  }

  if (input & 16) {
    result.reverse();
  }

  return result;
}