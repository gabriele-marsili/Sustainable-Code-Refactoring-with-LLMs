function encode(string) {
  let result = '';
  let i = 0;
  const len = string.length;
  
  while (i < len) {
    const char = string[i];
    let count = 1;
    
    while (i + count < len && string[i + count] === char) {
      count++;
    }
    
    if (count > 1) {
      result += count + char;
    } else {
      result += char;
    }
    
    i += count;
  }
  
  return result;
}

function decode(string) {
  let result = '';
  let i = 0;
  const len = string.length;
  
  while (i < len) {
    if (/\d/.test(string[i])) {
      let numStr = '';
      while (i < len && /\d/.test(string[i])) {
        numStr += string[i];
        i++;
      }
      
      if (i < len) {
        const count = parseInt(numStr, 10);
        const char = string[i];
        result += char.repeat(count);
        i++;
      }
    } else {
      result += string[i];
      i++;
    }
  }
  
  return result;
}

export { encode, decode };