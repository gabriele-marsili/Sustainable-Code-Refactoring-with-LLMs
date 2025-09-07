export function encode(input) {
  let result = '';
  let i = 0;
  const len = input.length;
  
  while (i < len) {
    const char = input[i];
    let count = 1;
    
    while (i + count < len && input[i + count] === char) {
      count++;
    }
    
    result += count > 1 ? count + char : char;
    i += count;
  }
  
  return result;
}

export function decode(input) {
  let result = '';
  let i = 0;
  const len = input.length;
  
  while (i < len) {
    let numStr = '';
    
    while (i < len && input[i] >= '0' && input[i] <= '9') {
      numStr += input[i];
      i++;
    }
    
    if (numStr && i < len) {
      const count = parseInt(numStr, 10);
      result += input[i].repeat(count);
      i++;
    } else if (i < len) {
      result += input[i];
      i++;
    }
  }
  
  return result;
}