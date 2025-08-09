#include "bob.h"
#include <string>
#include <cctype> // For std::isspace, std::isalpha, std::isupper

// It's generally good practice to avoid 'using namespace std;' in header files
// or at global scope in .cpp files to prevent name collisions.
// Explicitly qualify standard library elements with 'std::'.

// Optimized version of bob::hey function
std::string bob::hey(const std::string& statement) // Pass by const reference to avoid string copying
{
    // Initialize flags based on the original logic's default assumptions
    bool spaces_only = true;
    bool has_alpha_char = false;     // Corresponds to !original_empty_string
    bool all_letters_uppercase = true; // Corresponds to original_all_uppercase

    // To determine if the last non-whitespace character is a question mark,
    // we track the index of the last observed non-whitespace character.
    int last_non_whitespace_char_idx = -1;

    // Perform a single pass through the string to gather all necessary information.
    // Using a traditional for loop with an index allows easy tracking of
    // last_non_whitespace_char_idx.
    for (int i = 0; i < statement.length(); ++i)
    {
        char c = statement[i];
        // Safely cast char to unsigned char for cctype functions to avoid
        // potential issues with negative char values (e.g., for extended ASCII).
        unsigned char uc = static_cast<unsigned char>(c);

        // Update 'spaces_only' flag: if any non-whitespace char is found, it's false.
        // Also, record its index for the trailing question mark check.
        if (!std::isspace(uc))
        {
            spaces_only = false;
            last_non_whitespace_char_idx = i;
        }

        // Update 'has_alpha_char' flag: if any alphabetic char is found, it's true.
        if (std::isalpha(uc))
        {
            has_alpha_char = true;

            // Update 'all_letters_uppercase' flag:
            // If an alphabetic character is found and it's NOT uppercase,
            // then not all letters are uppercase. Non-alphabetic characters
            // do not affect this flag, matching the original behavior.
            if (!std::isupper(uc))
            {
                all_letters_uppercase = false;
            }
        }
    }

    // Apply the decision logic in the exact order as the original code snippet.
    // This preserves the original behavior, including precedence rules.

    // 1. Check for silence (empty string or only whitespace characters)
    if (spaces_only)
    {
        return "Fine. Be that way!";
    }
    // 2. Check for yelling (contains at least one letter and all letters are uppercase)
    //    This condition combines the original `all_uppercase` and `!empty_string` checks.
    else if (has_alpha_char && all_letters_uppercase)
    {
        return "Whoa, chill out!";
    }

    // 3. Check for a question (last non-whitespace character is '?')
    //    This check only occurs if the previous two conditions were false.
    bool ends_with_question_mark = false;
    if (last_non_whitespace_char_idx != -1) // Ensure there was at least one non-whitespace character
    {
        if (statement[last_non_whitespace_char_idx] == '?')
        {
            ends_with_question_mark = true;
        }
    }

    if (ends_with_question_mark)
    {
        return "Sure.";
    }

    // 4. Default response if none of the above conditions are met.
    return "Whatever.";
}