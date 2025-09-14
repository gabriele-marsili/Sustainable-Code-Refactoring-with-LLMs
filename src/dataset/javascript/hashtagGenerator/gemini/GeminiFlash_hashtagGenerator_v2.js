function generateHashtag (str) {
  str = str.trim();
  if (!str) {
    return false;
  }

  let hashtag = "#";
  const words = str.split(/\s+/);

  for (const word of words) {
    if (word) {
      hashtag += word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  return hashtag.length > 140 ? false : hashtag;
}

export default generateHashtag;