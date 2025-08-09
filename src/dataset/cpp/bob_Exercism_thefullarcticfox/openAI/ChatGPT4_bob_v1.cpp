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
		auto it = std::find_if(query.rbegin(), query.rend(), [](char c) {
			return !std::isspace(static_cast<unsigned char>(c));
		});
		if (it == query.rend())
			return "Fine. Be that way!";

		bool allcaps = has_only_caps_letters(query);
		char last_char = *it;

		if (last_char == '?') {
			if (allcaps)
				return "Calm down, I know what I'm doing!";
			return "Sure.";
		}

		if (allcaps)
			return "Whoa, chill out!";
		return "Whatever.";
	}
}  // namespace bob