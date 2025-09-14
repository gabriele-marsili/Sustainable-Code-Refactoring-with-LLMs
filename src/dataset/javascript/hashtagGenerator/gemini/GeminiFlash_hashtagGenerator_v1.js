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

  if (outputString.length > 140) {
    return false;
  }

  return outputString;
}

export default generateHashtag;