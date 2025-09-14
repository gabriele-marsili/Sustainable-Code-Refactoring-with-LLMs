function domainName(url) {
  let start = 0;
  
  if (url.startsWith('https://')) {
    start = 8;
  } else if (url.startsWith('http://')) {
    start = 7;
  }
  
  if (url.startsWith('www.', start)) {
    start += 4;
  }
  
  const dotIndex = url.indexOf('.', start);
  return dotIndex === -1 ? url.slice(start) : url.slice(start, dotIndex);
}

export default domainName;