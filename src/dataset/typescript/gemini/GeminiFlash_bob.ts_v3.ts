export default class Bob {
  hey(message: string): string {
    const isWhitespaceOrEmpty = !/\S/.test(message);
    const containsUppercase = /[A-Z]/.test(message);
    const containsLowercase = /[a-z]/.test(message);
    const endsWithQuestionMark = /\?$/.test(message);

    if (isWhitespaceOrEmpty) {
      return 'Fine. Be that way!';
    }

    if (containsUppercase && !containsLowercase) { // Check for shouting: has uppercase letters AND no lowercase letters.
      return 'Whoa, chill out!';
    }

    if (endsWithQuestionMark) {
      return 'Sure.';
    }

    return 'Whatever.';
  }
}