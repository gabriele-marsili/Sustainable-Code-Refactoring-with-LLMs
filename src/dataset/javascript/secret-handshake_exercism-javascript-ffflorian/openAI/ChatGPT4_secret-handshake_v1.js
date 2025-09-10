const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    if (input & (1 << i)) {
      result.push(availableCommands[i]);
    }
  }
  return (input & 16) ? result.reverse() : result;
}