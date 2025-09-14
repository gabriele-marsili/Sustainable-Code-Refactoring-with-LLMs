function domainName(url){
  // Find the start of the domain by skipping protocol and www
  let start = 0;
  
  if (url.startsWith('https://')) {
    start = 8;
  } else if (url.startsWith('http://')) {
    start = 7;
  }
  
  if (url.startsWith('www.', start)) {
    start += 4;
  }
  
  // Find the end of the domain name (first dot after the start)
  const dotIndex = url.indexOf('.', start);
  
  return dotIndex === -1 ? url.slice(start) : url.slice(start, dotIndex);
}

export default domainName;