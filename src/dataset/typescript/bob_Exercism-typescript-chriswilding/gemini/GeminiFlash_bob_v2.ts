class Bob {
  hey(input: string): string {
    const trimmed = input.trim();

    if (trimmed === '') {
      return 'Fine. Be that way!';
    }

    const question = trimmed.endsWith('?');

    let hasUppercase = false;
    let hasLowercase = false;

    // Iterate through the trimmed string to check for character cases.
    // This avoids creating new intermediate strings with toLowerCase() and toUpperCase(),
    // reducing memory allocation and CPU cycles.
    for (let i = 0; i < trimmed.length; i++) {
      const charCode = trimmed.charCodeAt(i);

      // Check for lowercase ASCII letters
      if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
        hasLowercase = true;
      }
      // Check for uppercase ASCII letters
      else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
        hasUppercase = true;
      }

      // Optimization: If we've already found both an uppercase and a lowercase letter,
      // we know it cannot be a pure shout (all uppercase). We still need to scan the
      // rest of the string to ensure no uppercase letter was missed if we haven't found one yet,
      // but in this specific logic for 'shout' where `hasUppercase && !hasLowercase`,
      // if `hasLowercase` becomes true, and `hasUppercase` is also true, then `shout`
      // will be false. So, we can potentially short-circuit if both `hasLowercase`
      // and `hasUppercase` are true, as `shout` will definitively be false.
      // However, for clarity and negligible performance impact for typical inputs,
      // the loop proceeds to ensure all characters are examined, setting accurate flags.
    }

    // A shout is defined as containing at least one uppercase letter and no lowercase letters.
    const shout = hasUppercase && !hasLowercase;

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