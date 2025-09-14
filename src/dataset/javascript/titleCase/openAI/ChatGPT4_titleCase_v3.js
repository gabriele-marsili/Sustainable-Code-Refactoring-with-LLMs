function titleCase(title, minorWords) {
  if (!title) return title;

  const minorWordsSet = new Set(
    (minorWords || "").toLowerCase().split(" ")
  );

  return title
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 || !minorWordsSet.has(word)
        ? word[0].toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
}

export default titleCase;