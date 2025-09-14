function domainName(url){
  // Remove protocol and www in one pass using replace
  const cleanUrl = url.replace(/^https?:\/\/(www\.)?/, '');
  
  // Find first dot and extract domain name
  const dotIndex = cleanUrl.indexOf('.');
  return dotIndex === -1 ? cleanUrl : cleanUrl.substring(0, dotIndex);
}

export default domainName;