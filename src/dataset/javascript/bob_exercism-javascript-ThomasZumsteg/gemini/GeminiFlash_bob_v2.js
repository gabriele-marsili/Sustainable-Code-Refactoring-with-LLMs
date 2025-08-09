var Bob = function() {};

Bob.prototype.hey = function(input) {
    // Check for "Nothing" first: input consists only of whitespace characters or is empty.
    // `trim()` removes leading and trailing whitespace characters (including Unicode whitespace, which matches `\s`).
    // This is the most semantically correct and often performant way to implement `(/^\s*$/).test(input)`.
    // It will create a new string, but it's typically highly optimized internally.
    if (input.trim().length === 0) {
        return "Fine. Be that way!";
    }

    // Determine if the input contains at least one ASCII uppercase letter.
    // This replaces `/[A-Z]/.test(input)` with a manual loop for better performance,
    // as it avoids creating a new RegExp object (if not cached) and allows for an early exit.
    let hasAsciiLetter = false;
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        // ASCII uppercase letters are from 'A' (65) to 'Z' (90)
        if (charCode >= 65 && charCode <= 90) {
            hasAsciiLetter = true;
            break; // Found one, no need to check further
        }
    }

    // Shouting check:
    // 1. `input.toUpperCase() === input`: Checks if all characters in the string are already in their uppercase form.
    //    This is crucial for Unicode characters (e.g., 'ü' vs 'Ü') and is best handled by the built-in `toUpperCase()`,
    //    which is highly optimized and locale-aware. While it creates a new string, reimplementing this logic
    //    in pure JavaScript could be slower and more error-prone for Unicode.
    // 2. `hasAsciiLetter`: Ensures there's at least one actual ASCII letter, differentiating "123" from "HELLO".
    if (input.toUpperCase() === input && hasAsciiLetter) {
        return "Whoa, chill out!";
    }

    // Question check:
    // The regular expression `/\?\s*$/` efficiently checks if the string ends with a question mark
    // followed by zero or more whitespace characters. Modern JavaScript engines are highly
    // optimized for regular expression matching.
    if (/\?\s*$/.test(input)) {
        return "Sure.";
    }

    // Default response if no other condition is met.
    return "Whatever.";
};

export default Bob;