#include "bob.h"
#include <string>
#include <cctype> // For std::isspace, std::isalpha, std::isupper

// Using `std::` prefix explicitly for clarity and to avoid name collisions,
// which aligns with clean and maintainable coding practices in C++.

std::string bob::hey(const std::string& statement)
{
    // Use `const std::string&` to avoid unnecessary string copy of the input.
    // This reduces memory allocation, CPU cycles, and consequently energy consumption,
    // especially for large input strings. It maintains the external interface
    // (how the function is called) while optimizing the internal implementation.

    bool is_all_whitespace = true;
    bool contains_alpha = false;
    bool is_all_alpha_uppercase = true;

    // First pass: Determine properties related to "silence" and "shouting".
    // Iterate through the string using a range-based for loop for readability and efficient traversal.
    for (char c_val : statement)
    {
        // Cast char to unsigned char for safe use with ctype functions (e.g., std::isspace).
        // This prevents potential issues if `char` is signed and has a negative value,
        // which could lead to undefined behavior with ctype functions.
        unsigned char c = static_cast<unsigned char>(c_val);

        if (!std::isspace(c))
        {
            is_all_whitespace = false;
        }

        if (std::isalpha(c))
        {
            contains_alpha = true;
            if (!std::isupper(c))
            {
                is_all_alpha_uppercase = false;
            }
        }

        // Early exit optimization:
        // If we've already found a non-whitespace character AND
        // we've found at least one alphabetic character that is not uppercase,
        // then the statement can neither be "all whitespace" nor "all uppercase shouting".
        // In this scenario, further iterating for these specific flags is redundant.
        if (!is_all_whitespace && !is_all_alpha_uppercase && contains_alpha)
        {
            break;
        }
    }

    if (is_all_whitespace)
    {
        return "Fine. Be that way!";
    }
    else if (is_all_alpha_uppercase && contains_alpha)
    {
        // This condition implies the statement contains alphabetic characters,
        // and all of them are uppercase, qualifying it as a "shout".
        return "Whoa, chill out!";
    }

    // Second pass: Check for a trailing question mark.
    bool has_trailing_question_mark = false;
    // Iterate in reverse from the end of the string to find the last significant character.
    for (auto it = statement.rbegin(); it != statement.rend(); ++it)
    {
        unsigned char c = static_cast<unsigned char>(*it);
        if (c == '?')
        {
            has_trailing_question_mark = true;
            break; // Found a question mark, no need to check further.
        }
        else if (!std::isspace(c))
        {
            // Found a non-whitespace, non-question-mark character before a potential '?'.
            // This means there is no effective trailing question mark.
            break;
        }
    }

    if (has_trailing_question_mark)
    {
        return "Sure.";
    }

    // Default response if no other conditions are met.
    return "Whatever.";
}