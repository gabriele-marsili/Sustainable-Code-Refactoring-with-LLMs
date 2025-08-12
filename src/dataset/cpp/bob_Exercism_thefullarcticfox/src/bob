#include "bob.h"
#include <cctype>

namespace bob {

	bool has_only_caps_letters(const std::string& str) {
		bool has_letter = false;
		for (char c : str) {
			if (std::isalpha(static_cast<unsigned char>(c))) {
				has_letter = true;
				if (std::islower(static_cast<unsigned char>(c)))
					return false;
			}
		}
		return has_letter;
	}

	std::string hey(const std::string& query) {
		auto it = query.find_last_not_of(" \t\n\v\f\r");
		if (it == std::string::npos)
			return "Fine. Be that way!";

		bool allcaps = has_only_caps_letters(query);
		char last_char = query[it];

		if (last_char == '?')
			return allcaps ? "Calm down, I know what I'm doing!" : "Sure.";

		return allcaps ? "Whoa, chill out!" : "Whatever.";
	}

}  // namespace bob