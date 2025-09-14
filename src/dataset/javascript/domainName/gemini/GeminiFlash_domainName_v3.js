function domainName(url){
  let domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
  return domain.split('.')[0];
}

export default domainName;