class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim();

        if (message.length === 0) {
            return 'Fine. Be that way!';
        } else if (isUpperCaseAndHasAlphabeticChars(message)) {
            return 'Whoa, chill out!';
        } else if (message.endsWith('?')) {
            return 'Sure.';
        } else {
            return 'Whatever.';
        }
    }
}

function isUpperCaseAndHasAlphabeticChars(s: string): boolean {
    let hasAlphabeticChar = false;
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        // Check if character is an uppercase letter (A-Z)
        if (charCode >= 65 && charCode <= 90) { // ASCII A-Z
            hasAlphabeticChar = true;
        } 
        // Check if character is a lowercase letter (a-z)
        else if (charCode >= 97 && charCode <= 122) { // ASCII a-z
            return false; // Found a lowercase alphabetic char, so it's not all uppercase
        }
    }
    // If we reached here, no lowercase alphabetic characters were found.
    // Now, ensure there was at least one alphabetic character (which must be uppercase).
    return hasAlphabeticChar;
}

export default Bob;