#include "bob.h"
#include <string>
#include <cctype> // For isspace, isalpha, isupper

std::string bob::hey(const std::string& statement)
{
    // Use const reference to avoid string copy, which is a significant performance/energy optimization.

    bool all_whitespace = true;
    bool all_letters_uppercase = true; // True if no letters or all found letters are uppercase.
    bool has_letter = false;           // True if at least one alphabetic character is found.

    // First pass: Analyze the string for "shouting" and "silence" conditions.
    // Iterate over the string character by character.
    for (char c : statement)
    {
        // Cast char to unsigned char for cctype functions to prevent potential undefined behavior
        // with negative char values (if char is signed).
        unsigned char uc = static_cast<unsigned char>(c);

        if (!std::isspace(uc))
        {
            all_whitespace = false; // Found a non-whitespace character
        }

        if (std::isalpha(uc))
        {
            has_letter = true; // Found an alphabetic character
            if (!std::isupper(uc))
            {
                all_letters_uppercase = false; // Found a lowercase letter
            }
        }

        // Optimization: If we've already determined that the string is neither
        // purely whitespace nor an all-uppercase "shout", we can stop the first pass early.
        // This is equivalent to the original `if (!spaces_only && !all_uppercase) break;`
        if (!all_whitespace && !all_letters_uppercase)
        {
            // If `all_whitespace` is false (meaning we found a non-space char)
            // AND `all_letters_uppercase` is false (meaning we found a lowercase letter),
            // then it cannot be "Fine. Be that way!" or "Whoa, chill out!".
            // We can break early as the remaining conditions (`Sure.` or `Whatever.`)
            // are handled by a subsequent (potentially reverse) scan.
            break;
        }
    }

    // Evaluate conditions based on the first pass
    if (all_whitespace)
    {
        // An empty string will also fall into this category, which is the desired behavior ("Fine. Be that way!").
        return "Fine. Be that way!";
    }
    else if (all_letters_uppercase && has_letter)
    {
        // All letters are uppercase AND there is at least one letter.
        return "Whoa, chill out!";
    }

    // Second pass: Check for a trailing question mark.
    // This requires iterating from the end of the string until a non-space character is found.
    bool has_trailing_question_mark = false;
    for (auto it = statement.rbegin(); it != statement.rend(); ++it)
    {
        unsigned char uc = static_cast<unsigned char>(*it);
        if (*it == '?')
        {
            has_trailing_question_mark = true;
            break; // Found a '?', so it's a question.
        }
        else if (!std::isspace(uc))
        {
            // Found a non-whitespace character that is not a '?',
            // so it's not a question ending with '?'.
            break;
        }
    }

    if (has_trailing_question_mark)
    {
        return "Sure.";
    }

    // Default response if none of the above conditions are met.
    return "Whatever.";
}