export function hey(message: string): string {
    const trimmedMessage = message.trim();
    const hasMessage = trimmedMessage !== '';

    if (!hasMessage) {
        return 'Fine. Be that way!';
    }

    const isQuestion = trimmedMessage.endsWith('?');

    // Optimize isShouting calculation to avoid an extra string allocation from toUpperCase()
    // and allow for early exit when a lowercase letter is found.
    let containsLetter = false;
    let isAllUppercase = true; // Assume true until proven otherwise
    for (let i = 0; i < trimmedMessage.length; i++) {
        const charCode = trimmedMessage.charCodeAt(i);

        // Check for ASCII letters
        const isLowerCaseLetter = (charCode >= 97 && charCode <= 122); // 'a' to 'z'
        const isUpperCaseLetter = (charCode >= 65 && charCode <= 90);  // 'A' to 'Z'

        if (isLowerCaseLetter || isUpperCaseLetter) {
            containsLetter = true;
            if (isLowerCaseLetter) {
                isAllUppercase = false;
                // If a lowercase letter is found, it cannot be shouting (all uppercase),
                // so we can stop processing the string for this condition.
                break;
            }
        }
    }
    const isShouting = containsLetter && isAllUppercase;

    // Apply the logic based on the determined flags
    if (isQuestion && isShouting) {
        return "Calm down, I know what I'm doing!";
    } else if (isQuestion) { // isQuestion is true, isShouting is false
        return 'Sure.';
    } else if (isShouting) { // isQuestion is false, isShouting is true
        return 'Whoa, chill out!';
    } else { // isQuestion is false, isShouting is false
        return 'Whatever.';
    }
}