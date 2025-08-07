#include "bob.h"
#include <string>
#include <cctype> // For isspace, isalpha, isupper, islower

// Using namespace std; is common in .cpp files for brevity.
using namespace std;

// Optimized version of bob::hey to reduce runtime energy consumption and improve efficiency.
//
// Optimizations applied:
// 1. Parameter pass by const reference: `const string& statement` avoids unnecessary
//    copying of the input string, which significantly reduces memory allocation/deallocation
//    and CPU cycles, especially for large strings. This is a primary driver for energy savings.
// 2. Single pass for character analysis: All necessary flags (all_whitespace, has_alpha, has_lowercase)
//    and the last_significant_char are determined in a single loop through the string.
//    The original code used two separate loops (one forward, one reverse) and had a problematic early break.
//    A single pass improves cache locality and reduces overall CPU cycles.
// 3. Direct return of string literals: Avoids the creation and assignment of a temporary `result` string.
// 4. Robust character type checking: `static_cast<unsigned char>(c)` is used with `cctype` functions
//    (isspace, isalpha, islower) to ensure correct behavior across different platforms and avoid
//    potential undefined behavior with negative char values if `char` is signed by default.
// 5. Clearer variable names: Variables like `has_alpha` and `has_lowercase` more explicitly state
//    their purpose, enhancing readability.
string bob::hey(const string& statement)
{
    bool all_whitespace = true;
    bool has_alpha = false;
    bool has_lowercase = false;
    char last_significant_char = 0; // Stores the last non-whitespace character encountered

    // Iterate efficiently through the statement using a range-based for loop.
    for (char c : statement)
    {
        // Check if the character is not whitespace.
        // If it's not, set `all_whitespace` to false and update `last_significant_char`.
        // `static_cast<unsigned char>` ensures correct behavior with ctype functions.
        if (!isspace(static_cast<unsigned char>(c)))
        {
            all_whitespace = false;
            last_significant_char = c;
        }

        // Check if the character is an alphabetic letter.
        if (isalpha(static_cast<unsigned char>(c)))
        {
            has_alpha = true; // At least one alphabetic character found.
            // If the letter is lowercase, set `has_lowercase` to true.
            if (islower(static_cast<unsigned char>(c)))
            {
                has_lowercase = true;
            }
        }
    }

    // Apply Bob's response rules based on the collected flags, in order of precedence.

    // Rule 1: Empty string or only whitespace.
    if (all_whitespace)
    {
        return "Fine. Be that way!";
    }
    // Rule 2: Contains at least one alphabetic character and all alphabetic characters are uppercase.
    // This indicates a "shouting" statement.
    else if (has_alpha && !has_lowercase)
    {
        return "Whoa, chill out!";
    }
    // Rule 3: The last non-whitespace character is a question mark.
    else if (last_significant_char == '?')
    {
        return "Sure.";
    }
    // Rule 4: Default response for all other cases.
    else
    {
        return "Whatever.";
    }
}