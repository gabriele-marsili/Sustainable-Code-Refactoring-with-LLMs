#include "bob.h"

namespace bob {
	bool has_only_caps_letters(const std::string& str) {
		bool found_any_letter = false;

		for (char c : str) {
			if (std::isalpha(c)) {
				found_any_letter = true;
				if (std::islower(c)) {
					return false;
				}
			}
		}
		return found_any_letter;
	}

	std::string	hey(const std::string& query) {
		size_t	last_char_idx = query.find_last_not_of(" \t\n\v\f\r");
		if (last_char_idx == std::string::npos)
			return "Fine. Be that way!";

		bool is_all_caps = has_only_caps_letters(query);

		if (query.at(last_char_idx) == '?') {
			if (is_all_caps)
				return "Calm down, I know what I'm doing!";
			return "Sure.";
		}

		if (is_all_caps)
			return "Whoa, chill out!";
		return "Whatever.";
	}
}  // namespace bob