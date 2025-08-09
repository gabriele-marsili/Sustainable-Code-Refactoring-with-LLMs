export function hey(message: string): string {
    const trimmedMessage = message.trim();

    if (trimmedMessage === '') {
        return 'Fine. Be that way!';
    }

    // Optimize isShouting calculation to avoid full string toUpperCase() and regex
    // This reduces string allocations, CPU cycles, and memory footprint.
    let hasAlphabeticChar = false;
    let isAllUpperCase = true; // Assume all letters are uppercase until a lowercase one is found

    for (let i = 0; i < trimmedMessage.length; i++) {
        const char = trimmedMessage[i];
        const lowerChar = char.toLowerCase();
        const upperChar = char.toUpperCase();

        // Check if the character is an alphabetic character (i.e., its case can change)
        if (lowerChar !== upperChar) {
            hasAlphabeticChar = true; // Found an alphabetic character
            if (char === lowerChar) { // If the character itself is lowercase
                isAllUpperCase = false; // Then not all letters are uppercase
                // No break here, as we still need to confirm `hasAlphabeticChar`
                // and we need to process the entire string to accurately determine `isAllUpperCase`
                // (e.g., "FOO bar" needs to be fully scanned to find 'b', 'a', 'r')
            }
        }
    }

    // A message is considered shouting if it contains at least one alphabetic character
    // AND all alphabetic characters are uppercase.
    const isShouting = hasAlphabeticChar && isAllUpperCase;
    const isQuestion = trimmedMessage.endsWith('?');

    // Evaluate the conditions based on the requirements
    if (isQuestion && isShouting) {
        return "Calm down, I know what I'm doing!";
    } else if (isShouting) { // Implies !isQuestion && isShouting
        return 'Whoa, chill out!';
    } else if (isQuestion) { // Implies isQuestion && !isShouting
        return 'Sure.';
    } else { // Implies !isQuestion && !isShouting (and hasMessage, as empty string was handled)
        return 'Whatever.';
    }
}