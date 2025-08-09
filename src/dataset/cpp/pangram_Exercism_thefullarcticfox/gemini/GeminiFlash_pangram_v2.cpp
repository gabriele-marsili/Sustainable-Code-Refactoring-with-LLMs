#include "pangram.h"
#include <array>   // For std::array
#include <cctype>  // For std::tolower, std::isalpha

namespace pangram {
	bool is_pangram(const std::string& str) {
		// Use a fixed-size array to track found letters.
		// 'true' indicates the letter at that index (0 for 'a', 25 for 'z') has been found.
		// Initialized to all 'false'.
		std::array<bool, 26> found_letters{};
		int unique_count = 0; // Counts how many unique English alphabet letters have been found.

		for (char ch : str) {
			// Safely convert char to unsigned char for cctype functions
			// to avoid potential issues with negative char values.
			unsigned char uc = static_cast<unsigned char>(ch);

			// Check if the character is an alphabetic letter.
			if (std::isalpha(uc)) {
				// Convert the character to its lowercase equivalent.
				char lower_ch = static_cast<char>(std::tolower(uc));

				// Check if the lowercase character is within the 'a'-'z' range.
				// This ensures we only count the 26 English alphabet letters.
				if (lower_ch >= 'a' && lower_ch <= 'z') {
					// Calculate the index for the letter (e.g., 'a' -> 0, 'b' -> 1).
					int index = lower_ch - 'a';

					// If this letter hasn't been found yet, mark it as found and increment count.
					if (!found_letters[index]) {
						found_letters[index] = true;
						unique_count++;

						// Early exit: if all 26 unique letters are found, no need to process further.
						if (unique_count == 26) {
							return true;
						}
					}
				}
			}
		}

		// After processing the entire string, return true if all 26 letters were found.
		return unique_count == 26;
	}
}  // namespace pangram