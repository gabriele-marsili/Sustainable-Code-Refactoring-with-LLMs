#include <stdbool.h>
#include <ctype.h>
#include <stddef.h>

#define ALL ('z' - 'a' + 1)
// Pre-calculate the mask for all 26 bits set, for efficient comparison.
// 1U << ALL creates a bitmask with the 26th bit set (representing 2^26).
// Subtracting 1U results in a mask where bits 0 through 25 are all set.
#define ALL_MASK ((1U << ALL) - 1U)

bool is_pangram(const char *sentence)
{
	// Handle NULL or empty string inputs early.
	// Combining these checks reduces redundant conditional checks.
	if (sentence == NULL || *sentence == '\0') {
		return false;
	}

	// Use an unsigned int as a bitmask to track found letters.
	// Each bit from 0 to 25 corresponds to a letter 'a' through 'z'.
	// This uses significantly less memory (e.g., 4 bytes vs. 26 bytes for a bool array)
	// and allows for very fast bitwise operations.
	unsigned int found_letters_mask = 0U;

	// Iterate through the sentence character by character.
	char current_char;
	while ((current_char = *sentence) != '\0') {
		// Optimize character processing for ASCII-compatible systems:
		// Instead of separate `isalpha` and `tolower` calls (which can have overhead
		// due to locale awareness or function call overhead), directly check
		// and convert character ranges.
		if (current_char >= 'A' && current_char <= 'Z') {
			// If uppercase, convert to lowercase by setting the 5th bit (0x20).
			// Example: 'A' (0x41) becomes 'a' (0x61) after ORing with 0x20.
			current_char |= 0x20;
		}

		// Now, check if the character is a lowercase English alphabet.
		if (current_char >= 'a' && current_char <= 'z') {
			// Calculate the bit index (0 for 'a', 1 for 'b', ..., 25 for 'z').
			unsigned int bit_idx = current_char - 'a';

			// Set the corresponding bit in the mask.
			// This is an extremely fast operation (single CPU instruction).
			found_letters_mask |= (1U << bit_idx);

			// Early exit optimization: If all 26 unique letters have been found,
			// we can return true immediately without processing the rest of the sentence.
			// Comparing the mask with ALL_MASK is a single, fast comparison.
			if (found_letters_mask == ALL_MASK) {
				return true;
			}
		}
		sentence++; // Move to the next character in the sentence.
	}

	// If the loop finishes and not all letters were found, return false.
	return false;
}