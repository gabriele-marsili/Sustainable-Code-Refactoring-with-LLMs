#include "pangram.h"
#include <string>
#include <bitset>   // For std::bitset
#include <cctype>   // For std::tolower and std::isalpha

namespace pangram {
	bool	is_pangram(const std::string& str) {
		std::bitset<26> seen_letters;
		int unique_count = 0;

		for (char c : str) {
			// std::tolower and std::isalpha expect an int, and the argument must be representable as unsigned char or EOF.
			// Casting to unsigned char before passing helps avoid potential issues with negative char values.
			unsigned char uc = static_cast<unsigned char>(c);
			if (std::isalpha(uc)) {
				char lower_c = std::tolower(uc);
				// Assuming standard English alphabet 'a' through 'z'
				// This avoids reliance on locale settings and directly maps 'a'-'z' to 0-25.
				if (lower_c >= 'a' && lower_c <= 'z') {
					int index = lower_c - 'a';
					if (!seen_letters.test(index)) {
						seen_letters.set(index);
						unique_count++;
						if (unique_count == 26) {
							return true; // All 26 unique letters found, early exit
						}
					}
				}
			}
		}
		return unique_count == 26;
	}
}  // namespace pangram