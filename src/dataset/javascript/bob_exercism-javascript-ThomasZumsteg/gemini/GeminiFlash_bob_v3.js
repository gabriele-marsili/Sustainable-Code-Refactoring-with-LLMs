var Bob = function() {};

Bob.prototype.hey = function(input) {
    // Flags to determine properties of the input string
    let hasLetters = false;
    let containsLowerCase = false;

    // Single pass to efficiently determine letter presence and case for "Shouting" check
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        // Check for uppercase A-Z (ASCII for common cases, extend with Unicode ranges if needed for broader definition)
        if (charCode >= 65 && charCode <= 90) { // 'A' to 'Z'
            hasLetters = true;
        }
        // Check for lowercase a-z (ASCII)
        else if (charCode >= 97 && charCode <= 122) { // 'a' to 'z'
            containsLowerCase = true;
            hasLetters = true; // It has letters, but some are lowercase
            // No need to break yet, other checks might still apply.
            // For shouting logic, finding one lowercase character is enough to disqualify.
        }
    }

    /* A teenager */

    // 1. Shouting (all upper case letters and contains at least one letter)
    // This condition is true if there are no lowercase letters found AND there is at least one letter (uppercase).
    if (!containsLowerCase && hasLetters) {
        return "Whoa, chill out!";
    }

    // 2. Question (ends with a question mark, possibly with trailing whitespace)
    // The regular expression `/\?\s*$/` is concise and efficient for this specific trailing pattern.
    if (/\?\s*$/.test(input)) {
        return "Sure.";
    }

    // 3. Nothing (all white space or empty string)
    // `trim()` is highly optimized by JavaScript engines and is the most robust way
    // to check for strings composed solely of whitespace characters or an empty string.
    if (input.trim().length === 0) {
        return "Fine. Be that way!";
    }

    // 4. Default
    return "Whatever.";
};

export default Bob;