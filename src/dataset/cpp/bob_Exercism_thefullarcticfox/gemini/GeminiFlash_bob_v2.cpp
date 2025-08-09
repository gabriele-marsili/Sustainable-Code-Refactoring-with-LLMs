#include "bob.h"
#include <cctype> // Required for std::isalpha and std::islower
#include <string>   // Required for std::string and std::string::npos

namespace bob {
	// Optimizes `has_only_caps_letters` for reduced runtime energy consumption:
	// - Replaces `size_t lettercount` with a `bool found_any_letter` flag.
	//   This reduces memory overhead and CPU cycles associated with incrementing
	//   and storing a counter, using a simpler boolean state.
	// - Prioritizes the `std::islower` check for an early exit. If a lowercase
	//   character is found, the function immediately returns `false`, preventing
	//   unnecessary further iteration.
	// - The logic for determining if any letters were present at all is more direct.
	bool has_only_caps_letters(const std::string& str) {
		bool found_any_letter = false;

		for (char c : str) {
			if (std::islower(c)) {
				return false; // Found a lowercase letter, so it's not all caps. Early exit.
			}
			if (std::isalpha(c)) {
				// If it's alphabetic and not lowercase (checked above), it must be uppercase
				// or another alphabetic character (e.g., title case if locale dependent, but for Bob it typically means uppercase).
				// We just need to know if *any* letters were found.
				found_any_letter = true;
			}
		}
		// If the loop completes, no lowercase letters were found.
		// Return true only if at least one alphabetic character was present in the string.
		return found_any_letter;
	}

	// The `hey` function's structure is generally efficient.
	// Minor micro-optimizations applied for character access.
	std::string hey(const std::string& query) {
		// Use `find_last_not_of` with a C-string literal for potential minor performance gain
		// compared to constructing a temporary `std::string` for the delimiters, though compilers
		// often optimize this.
		size_t lastnonspace = query.find_last_not_of(" \t\n\v\f\r");

		// Handle cases where the string is empty or contains only whitespace.
		if (lastnonspace == std::string::npos) {
			return "Fine. Be that way!";
		}

		// Access the last non-space character using `operator[]` instead of `.at()`.
		// This avoids the overhead of bounds checking and potential exception throwing,
		// as `lastnonspace` is already guaranteed to be a valid index by the `npos` check.
		const char actual_last_char = query[lastnonspace];

		// The `has_only_caps_letters` function iterates the entire string in the worst case.
		// Calling it once and storing the result avoids redundant computations,
		// improving efficiency if the `allcaps` status is needed for multiple conditions.
		bool allcaps = has_only_caps_letters(query);

		// Determine Bob's response based on the rules.
		if (actual_last_char == '?') {
			if (allcaps) {
				return "Calm down, I know what I'm doing!";
			}
			return "Sure.";
		}

		if (allcaps) {
			return "Whoa, chill out!";
		}

		return "Whatever.";
	}
}  // namespace bob