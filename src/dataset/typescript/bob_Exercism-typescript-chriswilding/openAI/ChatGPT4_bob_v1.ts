class Bob {
  hey(input: string): string {
    let hasLetter = false;
    let isUpper = true;
    let i = 0;
    const len = input.length;

    // Trim manually to avoid creating a new string
    while (i < len && /\s/.test(input[i])) i++;
    let end = len - 1;
    while (end >= i && /\s/.test(input[end])) end--;

    if (i > end) return 'Fine. Be that way!';

    const lastChar = input[end];
    const question = lastChar === '?';

    for (let j = i; j <= end; j++) {
      const c = input[j];
      if (/[a-zA-Z]/.test(c)) {
        hasLetter = true;
        if (c !== c.toUpperCase()) {
          isUpper = false;
          break;
        }
      }
    }

    const shout = hasLetter && isUpper;

    if (question && shout) return "Calm down, I know what I'm doing!";
    if (question) return 'Sure.';
    if (shout) return 'Whoa, chill out!';
    return 'Whatever.';
  }
}

export default Bob;