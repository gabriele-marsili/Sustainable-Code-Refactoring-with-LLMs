class Bob {
  hey(input) {
    const trimmed = input.trim();
    if (!trimmed) return "Fine. Be that way!";
    const isQuestion = trimmed.endsWith("?");
    const isShouting = /[A-Z]/.test(trimmed) && trimmed === trimmed.toUpperCase();
    if (isShouting) return "Whoa, chill out!";
    if (isQuestion) return "Sure.";
    return "Whatever.";
  }
}

export default Bob;