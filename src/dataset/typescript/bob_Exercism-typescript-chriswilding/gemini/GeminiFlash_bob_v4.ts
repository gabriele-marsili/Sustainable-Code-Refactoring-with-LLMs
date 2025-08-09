class Bob {
  private isShout(s: string): boolean {
    let hasUpperCaseLetter = false;
    let hasLowerCaseLetter = false;

    for (let i = 0; i < s.length; i++) {
      const charCode = s.charCodeAt(i);
      // Check for uppercase ASCII letters (A-Z)
      if (charCode >= 65 && charCode <= 90) { // 'A' (65) to 'Z' (90)
        hasUpperCaseLetter = true;
      }
      // Check for lowercase ASCII letters (a-z)
      else if (charCode >= 97 && charCode <= 122) { // 'a' (97) to 'z' (122)
        hasLowerCaseLetter = true;
        // If any lowercase letter is found, it cannot be a shout.
        // This optimizes by allowing an early exit.
        return false;
      }
    }
    // If we reach here, no lowercase letters were found.
    // It is considered a shout only if it contains at least one uppercase letter.
    return hasUpperCaseLetter;
  }

  hey(input: string): string {
    const trimmed = input.trim();

    if (trimmed === '') {
      return 'Fine. Be that way!';
    }

    const question = trimmed.endsWith('?');
    const shout = this.isShout(trimmed);

    if (question && shout) {
      return "Calm down, I know what I'm doing!";
    }
    if (question) {
      return 'Sure.';
    }
    if (shout) {
      return 'Whoa, chill out!';
    }
    return 'Whatever.';
  }
}

export default Bob;