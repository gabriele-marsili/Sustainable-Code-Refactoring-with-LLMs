function generateHashtag (str) {
  str = str.trim();
  if (!str) {
    return false;
  }

  let outputString = '#';
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word) {
      outputString += word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  return (outputString.length > 140) ? false : outputString;
}

export default generateHashtag;