#include <string>   // For std::string, std::string::npos
#include <cctype>   // For std::isalpha, std::islower

// Assuming "bob.h" contains necessary declarations, e.g.:
// namespace bob {
//     bool        has_only_caps_letters(const std::string& str);
//     std::string hey(const std::string& query);
// }

namespace bob {
	// Optimized version of has_only_caps_letters:
	// - Uses a boolean flag instead of a counter for efficiency.
	// - Prioritizes the most frequent early exit condition (finding a lowercase letter).
	// - Ensures robustness by casting char to unsigned char for cctype functions.
	bool has_only_caps_letters(const std::string& str) {
		bool has_letter = false; // Tracks if at least one alphabetic character is found

		for (char c_raw : str) {
			// Cast char to unsigned char to avoid potential undefined behavior
			// if char is signed and contains negative values, as cctype functions
			// expect int convertible from unsigned char or EOF.
			unsigned char c = static_cast<unsigned char>(c_raw);

			// If any character is lowercase, it cannot be "all caps".
			// This is the most common reason to exit early.
			if (std::islower(c)) {
				return false;
			}
			// If the character is alphabetic (and we know it's not lowercase from the
			// previous check, so it must be uppercase), mark that we've found a letter.
			if (std::isalpha(c)) {
				has_letter = true;
			}
		}

		// If the loop completes, it means no lowercase letters were found.
		// The string is "all caps" if and only if it also contains at least one letter.
		return has_letter;
	}

	std::string hey(const std::string& query) {
		// Find the index of the last non-whitespace character.
		// This handles silence (empty or all-whitespace strings) efficiently.
		size_t last_non_space_idx = query.find_last_not_of(" \t\n\v\f\r");

		// If no non-whitespace characters are found, it's a silent query.
		if (last_non_space_idx == std::string::npos) {
			return "Fine. Be that way!";
		}

		// Determine if the entire query string is considered "all caps" by Bob's rules.
		// This call iterates over the whole string, which is necessary for this check.
		bool is_all_caps = has_only_caps_letters(query);

		// Check if the last significant character is a question mark.
		// Using .at() for bounds checking, though [] would also be safe here
		// since last_non_space_idx is guaranteed to be valid if not npos.
		if (query.at(last_non_space_idx) == '?') {
			// It's a question. Further check if it's also all caps (a yelling question).
			if (is_all_caps) {
				return "Calm down, I know what I'm doing!"; // Yelling question
			}
			return "Sure."; // Normal question
		}

		// Not a question. Check if it's all caps (a yelling statement).
		if (is_all_caps) {
			return "Whoa, chill out!"; // Yelling statement
		}

		// Default response for anything else (normal statement).
		return "Whatever.";
	}
}  // namespace bob