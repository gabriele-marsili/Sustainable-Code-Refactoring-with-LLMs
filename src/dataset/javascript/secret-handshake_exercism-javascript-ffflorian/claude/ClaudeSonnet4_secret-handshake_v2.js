const availableCommands = ['jump', 'close your eyes', 'double blink', 'wink'];

export function commands(input) {
  const result = [];
  let shouldReverse = false;
  
  for (let bit = 1; bit <= 4; bit++) {
    if (input & (1 << bit)) {
      result.push(availableCommands[bit - 1]);
    }
  }
  
  if (input & 1) {
    result.reverse();
  }
  
  return result;
}