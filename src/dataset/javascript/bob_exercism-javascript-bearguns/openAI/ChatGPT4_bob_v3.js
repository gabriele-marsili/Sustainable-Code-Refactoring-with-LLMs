class Bob {
  hey(phrase) {
    const trimmed = phrase.trim();
    if (!trimmed) return "Fine. Be that way!";
    const isQuestion = trimmed.endsWith("?");
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isShouting = trimmed === trimmed.toUpperCase() && hasLetters;

    if (isShouting) return "Whoa, chill out!";
    if (isQuestion) return "Sure.";
    return "Whatever.";
  }
}

export default Bob;