function domainName(url) {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0];
}

export default domainName;