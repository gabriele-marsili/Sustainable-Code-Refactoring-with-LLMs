class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim();

        // The order of checks is important for Bob's rules:
        // 1. Silence takes precedence.
        // 2. Shouting takes precedence over questions if both apply (e.g., "HOW ARE YOU?").
        // 3. Questions (non-shouting).
        // 4. Default response.
        switch (true) {
            case message.length === 0:
                return 'Fine. Be that way!';
            case this.isUpperCaseAndHasAlphabeticChars(message):
                return 'Whoa, chill out!';
            case message.endsWith('?'):
                return 'Sure.';
            default:
                return 'Whatever.';
        }
    }

    /**
     * Determines if a string contains at least one alphabetic character
     * and all alphabetic characters are uppercase.
     * This version avoids creating new strings for `toUpperCase()` and `toLowerCase()`
     * by iterating through the string once, which is more memory and CPU efficient.
     * It assumes ASCII English alphabet for 'uppercase' and 'lowercase' checks.
     *
     * @param s The input string.
     * @returns True if the string is uppercase and has alphabetic characters, false otherwise.
     */
    private isUpperCaseAndHasAlphabeticChars(s: string): boolean {
        let hasAlphabetic = false;
        let hasLowercase = false;

        for (let i = 0; i < s.length; i++) {
            const charCode = s.charCodeAt(i);

            // Check if character is an uppercase letter (A-Z)
            if (charCode >= 65 && charCode <= 90) { // ASCII 'A' to 'Z'
                hasAlphabetic = true;
            }
            // Check if character is a lowercase letter (a-z)
            else if (charCode >= 97 && charCode <= 122) { // ASCII 'a' to 'z'
                hasLowercase = true;
                hasAlphabetic = true; // If we found a lowercase, it's definitely alphabetic
            }
            // Other characters (numbers, symbols, spaces) are ignored for this specific check.
        }

        // It's considered "shouting" if:
        // 1. No lowercase letters were found (meaning all alphabetic chars are uppercase) AND
        // 2. At least one alphabetic character was found.
        return !hasLowercase && hasAlphabetic;
    }
}

export default Bob;