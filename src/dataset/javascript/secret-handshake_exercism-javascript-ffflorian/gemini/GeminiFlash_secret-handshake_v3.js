const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const binary = input >>> 0;
  const result = [];

  for (let i = 0; i < 4; i++) {
    if ((binary >> i) & 1) {
      result.push(availableCommands[i]);
    }
  }

  if ((binary >> 4) & 1) {
    result.reverse();
  }

  return result;
}