#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    // These flags are initialized based on the assumption that the statement
    // fits these categories until proven otherwise.
    bool is_only_whitespace = true;     // True if all characters processed so far are whitespace
    bool is_all_caps = true;            // True if all alphabetic characters processed so far are uppercase
    bool has_alphabetic_char = false;   // True if at least one alphabetic character has been found

    // First pass: Determine general characteristics of the statement
    // Uses a range-based for loop for modern C++ iteration, which can be more efficient and readable.
    for (char ch : statement)
    {
        // Safely cast char to unsigned char for cctype functions to prevent undefined behavior
        // with negative char values (e.g., for extended ASCII characters if char is signed).
        unsigned char c = static_cast<unsigned char>(ch);

        if (is_only_whitespace && !std::isspace(c))
        {
            is_only_whitespace = false; // Found a non-whitespace character
        }

        if (std::isalpha(c))
        {
            has_alphabetic_char = true; // Found an alphabetic character
            if (!std::isupper(c))
            {
                is_all_caps = false; // Found a non-uppercase alphabetic character
            }
        }

        // Optimization: If the statement has been determined to be neither
        // purely whitespace nor an all-caps utterance (containing letters),
        // we can break early as the first two rules are already ruled out.
        // This preserves the original logic's early exit performance.
        if (!is_only_whitespace && !is_all_caps)
        {
            break;
        }
    }

    // Apply the first two rules based on the characteristics determined in the first pass
    if (is_only_whitespace)
    {
        return "Fine. Be that way!";
    }
    // Condition `is_all_caps && has_alphabetic_char` correctly identifies
    // an all-caps statement that contains at least one letter.
    else if (is_all_caps && has_alphabetic_char)
    {
        return "Whoa, chill out!";
    }

    // Second pass: Determine if the statement ends with a question mark
    bool ends_with_question_mark = false;
    // Iterate from the end of the string to find the last significant character.
    for (auto it = statement.rbegin(); it != statement.rend(); ++it)
    {
        // Safely cast char to unsigned char for cctype functions.
        unsigned char c = static_cast<unsigned char>(*it);

        if (c == '?')
        {
            ends_with_question_mark = true;
            break; // Found the question mark, no need to check further
        }
        else if (!std::isspace(c))
        {
            // Found a non-whitespace character that is not a question mark.
            // This means the last significant character is not a question mark,
            // so we can stop searching.
            break;
        }
    }

    // Apply the third rule
    if (ends_with_question_mark)
    {
        return "Sure.";
    }

    // Default response if none of the specific rules apply
    return "Whatever.";
}