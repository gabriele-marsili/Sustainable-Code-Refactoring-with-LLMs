const availableCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

export function commands(input) {
  const binary = input & 31; // Mask to ensure only the last 5 bits are considered
  const result = [];

  for (let i = 0; i < 4; i++) {
    if (binary & (1 << i)) {
      result.push(availableCommands[i]);
    }
  }

  return binary & 16 ? result.reverse() : result;
}