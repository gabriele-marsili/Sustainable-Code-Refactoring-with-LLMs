export function hey(message: string): string {
    const trimmedMessage = message.trim();
    const hasMessage = trimmedMessage.length > 0;

    if (!hasMessage) {
        return 'Fine. Be that way!';
    }

    const isQuestion = trimmedMessage.endsWith('?');

    let containsLetter = false;
    let allLettersAreUpperCase = true; // Assume true until a lowercase letter is found

    // Iterate through the trimmed message once to determine shouting status
    for (let i = 0; i < trimmedMessage.length; i++) {
        const charCode = trimmedMessage.charCodeAt(i);

        // Check for lowercase letters (ASCII 'a' through 'z')
        if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
            allLettersAreUpperCase = false;
            containsLetter = true;
            // Found a lowercase letter, so it cannot be shouting. No need to continue.
            break;
        }
        // Check for uppercase letters (ASCII 'A' through 'Z')
        else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
            containsLetter = true;
        }
        // Other characters (numbers, symbols, spaces within string) do not affect
        // allLettersAreUpperCase unless a lowercase letter was found.
    }

    const isShouting = containsLetter && allLettersAreUpperCase;

    // Decision matrix based on isQuestion and isShouting
    if (isQuestion && isShouting) {
        return "Calm down, I know what I'm doing!";
    }
    if (isQuestion && !isShouting) {
        return 'Sure.';
    }
    if (!isQuestion && isShouting) {
        return 'Whoa, chill out!';
    }
    // This final return covers the case where (!isQuestion && !isShouting)
    return 'Whatever.';
}