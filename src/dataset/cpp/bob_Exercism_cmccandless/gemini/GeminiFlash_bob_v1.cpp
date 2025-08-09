#include "bob.h"
#include <string>   // For std::string
#include <cctype>   // For std::isalpha, std::toupper

string bob::hey(string input)
{
    // Initialize flags. Using `bool` for boolean flags is clearer than `int`.
    bool isShouting = true;
    bool hasLetter = false;

    // Use `size_t` for string lengths and indices as it's the type returned by `string::size()`.
    // This avoids potential warnings or issues with very large string sizes where `int` might overflow,
    // and is generally considered safer and more idiomatic C++.
    size_t n = input.size();

    // Trim trailing spaces. Iterate from the end of the string.
    // `n` will represent the length of the string without trailing spaces.
    while (n > 0 && input[n - 1] == ' ') {
        n--;
    }

    // If, after trimming, the string is empty (or contained only spaces), respond accordingly.
    if (n == 0) {
        return "Fine. Be that way!";
    }

    // Iterate through the characters of the trimmed string to determine shouting and letter presence.
    for (size_t i = 0; i < n; ++i) {
        char ch = input[i];

        // Check if the character is an alphabet letter.
        // `std::isalpha` returns a non-zero value if `ch` is an alphabetic character, and 0 otherwise.
        if (std::isalpha(ch)) {
            hasLetter = true; // Mark that at least one letter has been found.
            // If the character is a letter, check if it's a lowercase letter.
            // `ch != std::toupper(ch)` is true if `ch` is a lowercase letter.
            // If a lowercase letter is found, the input is not considered "shouting".
            if (ch != std::toupper(ch)) {
                isShouting = false; // Input is not shouting.
                // If it's not shouting, the `(hasLetter && isShouting)` condition will always be false.
                // We don't need to check further characters for `isShouting` status.
                // `hasLetter` is already true here because `std::isalpha(ch)` was true.
                // So, we can break out of the loop early, saving further iterations.
                break;
            }
        }
        // If `ch` is not an alphabet character (e.g., number, symbol, space),
        // `isShouting` remains `true` (if it was already true), as non-letters don't negate shouting.
        // `hasLetter` also remains unchanged.
    }

    // First condition: "Whoa, chill out!" for shouting.
    // This applies if there's at least one letter and all letters are uppercase.
    if (hasLetter && isShouting) {
        return "Whoa, chill out!";
    }

    // Second condition: "Sure." for questions.
    // Check if the last non-space character is a question mark.
    if (input[n - 1] == '?') {
        return "Sure.";
    }

    // Default response: "Whatever.".
    return "Whatever.";
}