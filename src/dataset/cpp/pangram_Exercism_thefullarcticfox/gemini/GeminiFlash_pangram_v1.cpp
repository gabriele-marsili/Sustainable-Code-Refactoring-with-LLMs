#include "pangram.h"
#include <bitset>   // For std::bitset
#include <cctype>   // For std::isalpha, std::tolower
#include <string>   // For std::string (included via "pangram.h" or implicitly)

namespace pangram {
	bool is_pangram(const std::string& str) {
		// Use a bitset to efficiently track the presence of each letter (a-z).
		// A bitset of 26 bits is very memory efficient (typically 4 bytes).
		std::bitset<26> seen_letters;
		int unique_letter_count = 0; // Counter for how many unique letters (a-z) we've found

		// Iterate through each character in the input string.
		for (char ch : str) {
			// Safely convert char to unsigned char for cctype functions
			// to avoid undefined behavior with negative char values.
			unsigned char u_ch = static_cast<unsigned char>(ch);

			// Check if the character is an alphabetic letter.
			if (std::isalpha(u_ch)) {
				// Convert the letter to lowercase and calculate its 0-25 index.
				// 'a' -> 0, 'b' -> 1, ..., 'z' -> 25.
				int index = std::tolower(u_ch) - 'a';

				// If this specific letter has not been seen before (bit is not set).
				if (!seen_letters.test(index)) {
					// Mark the letter as seen by setting its corresponding bit.
					seen_letters.set(index);
					// Increment the count of unique letters found.
					unique_letter_count++;

					// Early exit: If we've found all 26 unique letters (a-z),
					// we can immediately return true, as it's a pangram.
					if (unique_letter_count == 26) {
						return true;
					}
				}
			}
		}

		// After iterating through the entire string, return true if we've found
		// exactly 26 unique letters, indicating it's a pangram.
		return unique_letter_count == 26;
	}
}  // namespace pangram