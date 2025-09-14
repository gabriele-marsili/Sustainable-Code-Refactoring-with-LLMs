function domainName(url){
  const protocolEnd = url.indexOf('://');
  let start = protocolEnd === -1 ? 0 : protocolEnd + 3;
  
  if (url.substring(start, start + 4) === 'www.') {
    start += 4;
  }
  
  const dotIndex = url.indexOf('.', start);
  return dotIndex === -1 ? url.substring(start) : url.substring(start, dotIndex);
}

export default domainName;