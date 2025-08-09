class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim();

        // The order of these checks is critical to maintain the original behavior.
        // For example, "HOW ARE YOU?" is both a yelling message and a question,
        // but the original code responds as if it's yelling due to the order.
        if (message.length === 0) {
            return 'Fine. Be that way!';
        }

        // This is the most computationally intensive check.
        // Optimized to iterate once and avoid creating new strings.
        if (isUpperCaseAndHasAlphabeticChars(message)) {
            return 'Whoa, chill out!';
        }

        if (message.endsWith('?')) {
            return 'Sure.';
        }

        return 'Whatever.';
    }
}

/**
 * Checks if a string contains at least one alphabetic character and all alphabetic characters are uppercase.
 * This function is optimized to iterate through the string once, avoiding the creation of new strings
 * (which `s.toUpperCase()` and `s.toLowerCase()` on the whole string would do).
 * This reduces memory allocations and CPU cycles, leading to lower energy consumption.
 *
 * @param s The input string.
 * @returns True if the string meets the criteria, false otherwise.
 */
function isUpperCaseAndHasAlphabeticChars(s: string): boolean {
    let hasAlpha = false;
    let allUpperCase = true;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // A character is considered "alphabetic" if its uppercase version is different
        // from its lowercase version. This is a robust way to check for letters,
        // handling various Unicode characters without complex regex or char code checks.
        if (char.toUpperCase() !== char.toLowerCase()) {
            hasAlpha = true; // Found at least one alphabetic character

            // Check if the found alphabetic character is not uppercase.
            // If it's a letter but not uppercase, then the "allUpperCase" condition fails.
            if (char.toUpperCase() !== char) {
                allUpperCase = false; // Found a lowercase letter

                // Optimization: If we've already established that the string contains
                // alphabetic characters (`hasAlpha` is true) and now found a lowercase one,
                // the final result `hasAlpha && allUpperCase` will definitely be `false`.
                // We can short-circuit and return immediately.
                return false;
            }
        }
    }

    // After iterating through the entire string:
    // Return true only if at least one alphabetic character was found AND
    // all found alphabetic characters were uppercase.
    return hasAlpha && allUpperCase;
}

export default Bob;