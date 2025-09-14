function generateHashtag (str) {
  str = str.trim();
  if (!str) {
    return false;
  }

  let outputString = '#';
  let words = str.split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word) {
      outputString += word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  return (outputString.length > 1 && outputString.length <= 140) ? outputString : false;
}

export default generateHashtag;