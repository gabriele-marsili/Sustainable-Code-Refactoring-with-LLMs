#include "pangram.h"

#include <ctype.h>   // For isalpha, tolower
// #include <string.h> // No longer needed as strlen is removed from the loop.

#define N_CHARS 26 // Number of English alphabet characters

// Macros for bit manipulation. Using 1U for unsigned literal to be explicit
// and safe when shifting, especially for positions close to int's bit limit.
#define SET_BIT(mask, pos) (mask |= (1U << (pos)))
#define GET_BIT(mask, pos) ((mask >> (pos)) & 1U)

bool is_pangram(const char *sentence) {
    // Mask to track which English letters (a-z) have been encountered.
    // Each bit position corresponds to a letter (e.g., bit 0 for 'a', bit 1 for 'b', etc.).
    // Initialized to 0, indicating no letters found yet.
    unsigned int mask = 0;

    // The target mask representing all 26 lowercase English letters set (bits 0-25 are 1).
    // This value is (1U << N_CHARS) - 1, which for N_CHARS=26 results in 0x3FFFFFF.
    // Declaring it as 'static const' ensures it's computed only once at program startup
    // or the first call to is_pangram, significantly improving efficiency for
    // repeated calls by avoiding redundant calculations.
    static const unsigned int PANGRAM_MASK = (1U << N_CHARS) - 1;

    // Handle edge case: a NULL sentence pointer cannot represent a pangram.
    if (sentence == NULL) {
        return false;
    }

    // Iterate through the sentence character by character until the null terminator ('\0') is found.
    // This approach avoids repeated calls to strlen() within the loop condition,
    // optimizing performance from a potential O(N^2) (due to strlen) to an efficient O(N).
    for (unsigned int i = 0; sentence[i] != '\0'; ++i) {
        char c = sentence[i];

        // Process only alphabetic characters. Non-alphabetic characters (digits, symbols, spaces)
        // do not contribute to the pangram check and are thus ignored.
        if (!isalpha(c)) {
            continue;
        }

        // Convert the character to lowercase. This is crucial for treating 'A' and 'a'
        // as the same letter (both will map to 'a's bit position).
        // The cast to char is for explicit type conversion, as tolower returns an int.
        c = (char)tolower(c);

        // Calculate the bit position for the current character.
        // 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
        // This relies on the ASCII/UTF-8 character set's contiguous encoding of 'a' through 'z'.
        unsigned int bit_pos = c - 'a';

        // Set the corresponding bit in the 'mask' to mark this letter as encountered.
        // If the bit is already set (meaning the letter was found before), the SET_BIT
        // operation (using bitwise OR) has no effect, making redundant checks unnecessary.
        SET_BIT(mask, bit_pos);

        // Early exit optimization: If the 'mask' (representing found letters) becomes
        // identical to 'PANGRAM_MASK' (representing all 26 letters), it means all
        // required letters have been found. In this scenario, the sentence is
        // definitively a pangram, and there's no need to process the rest of the string.
        // This can significantly save execution time for long sentences that are pangrams early on.
        if (mask == PANGRAM_MASK) {
            return true;
        }
    }

    // After iterating through the entire sentence, compare the final 'mask'
    // (which contains all letters found) with the 'PANGRAM_MASK'.
    // If they are identical, it implies all 26 English letters were present in the sentence.
    return mask == PANGRAM_MASK;
}