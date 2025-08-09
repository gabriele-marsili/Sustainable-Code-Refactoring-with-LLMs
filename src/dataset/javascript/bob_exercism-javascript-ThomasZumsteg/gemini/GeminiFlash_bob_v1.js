var Bob = function() {};

/**
 * Helper function to determine if a given input string qualifies as "shouting".
 *
 * This function optimizes the original `input.toUpperCase() === input && /[A-Z]/.test(input)`
 * condition by avoiding the creation of a new string via `toUpperCase()`. It iterates
 * through the input string, performing checks that directly emulate the original logic
 * with improved memory efficiency and the ability to short-circuit.
 *
 * A string is considered "shouting" if:
 * 1. It contains no lowercase ASCII letters (meaning `input.toUpperCase() === input` would be true).
 * 2. It contains at least one uppercase ASCII letter (meaning `/[A-Z]/.test(input)` would be true).
 *
 * @param {string} input The string to check.
 * @returns {boolean} True if the string is shouting, false otherwise.
 */
function isShouting(input) {
    let hasUpperCaseLetter = false; // Corresponds to `/[A-Z]/.test(input)`

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        
        // Check for ASCII uppercase letters ('A' through 'Z')
        if (char >= 'A' && char <= 'Z') {
            hasUpperCaseLetter = true;
        } 
        // Check for ASCII lowercase letters ('a' through 'z')
        else if (char >= 'a' && char <= 'z') {
            // If any lowercase letter is found, the string would change if `toUpperCase()`
            // were called, making `input.toUpperCase() === input` false.
            // Therefore, this string cannot be "shouting" by the defined criteria.
            return false; // Short-circuit: no need to check further.
        }
        // Characters that are not ASCII letters (numbers, symbols, spaces,
        // or other Unicode characters that don't change case) do not affect
        // the "all uppercase" condition, nor do they contribute to `hasUpperCaseLetter`.
    }

    // If the loop completes, it means no lowercase ASCII letters were found.
    // This satisfies the `input.toUpperCase() === input` part of the original condition.
    // Now, we only need to ensure there was at least one uppercase ASCII letter.
    return hasUpperCaseLetter;
}

Bob.prototype.hey = function(input) {
	/* A teenager */
    // Optimized Shouting check (all uppercase and contains at least one letter)
    // Uses the `isShouting` helper for improved performance and reduced memory allocation.
	if (isShouting(input)) {
		return "Whoa, chill out!";
	}
    
	// Question check (ends with a question mark, optionally followed by whitespace)
    // The regular expression `/\?\s*$/` is already concise and efficient for this check.
	if (/\?\s*$/.test(input)) {
		return "Sure.";
	}
    
	// Nothing check (consists of only whitespace characters or is empty)
    // The regular expression `/^\s*$/` is already concise and efficient for this check,
    // avoiding the need for `input.trim().length === 0` which creates a new string.
	if (/^\s*$/.test(input)) {
		return "Fine. Be that way!";
	}
    
	// Default response for any other input
	return "Whatever.";
};

export default Bob;