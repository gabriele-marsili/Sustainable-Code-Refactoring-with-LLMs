const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const num = input >>> 0;
  const result = [];

  for (let i = 0; i < 4; i++) {
    if ((num >> i) & 1) {
      result.push(availableCommands[i]);
    }
  }

  if ((num >> 4) & 1) {
    result.reverse();
  }

  return result;
}