const availableCommands = ['jump', 'close your eyes', 'double blink', 'wink'];

export function commands(input) {
  const result = [];
  let value = input >>> 0;
  
  if (value & 16) {
    if (value & 8) result.push('wink');
    if (value & 4) result.push('double blink');
    if (value & 2) result.push('close your eyes');
    if (value & 1) result.push('jump');
    result.reverse();
  } else {
    if (value & 1) result.push('jump');
    if (value & 2) result.push('close your eyes');
    if (value & 4) result.push('double blink');
    if (value & 8) result.push('wink');
  }
  
  return result;
}