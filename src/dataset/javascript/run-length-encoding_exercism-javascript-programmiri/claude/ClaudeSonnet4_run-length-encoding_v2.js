function encode(string) {
  let result = '';
  let i = 0;
  
  while (i < string.length) {
    const char = string[i];
    let count = 1;
    
    while (i + count < string.length && string[i + count] === char) {
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
  
  while (i < string.length) {
    if (/\d/.test(string[i])) {
      let numStr = '';
      while (i < string.length && /\d/.test(string[i])) {
        numStr += string[i];
        i++;
      }
      
      if (i < string.length) {
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