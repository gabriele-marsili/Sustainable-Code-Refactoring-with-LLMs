const availableCommands = ['jump', 'close your eyes', 'double blink', 'wink'];

export function commands(input) {
  const result = [];
  let shouldReverse = false;
  
  for (let bit = 1; bit < 16; bit <<= 1) {
    if (input & bit) {
      if (bit === 1) {
        shouldReverse = true;
      } else {
        const commandIndex = Math.log2(bit) - 1;
        result.push(availableCommands[commandIndex]);
      }
    }
  }
  
  return shouldReverse ? result.reverse() : result;
}