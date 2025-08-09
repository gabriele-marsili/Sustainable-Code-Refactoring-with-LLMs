#include "bob.h"
#include <cctype>

namespace bob {
	bool has_only_caps_letters(const std::string& str) {
		bool has_alpha = false;
		for (char c : str) {
			if (std::isalpha(static_cast<unsigned char>(c))) {
				has_alpha = true;
				if (std::islower(static_cast<unsigned char>(c)))
					return false;
			}
		}
		return has_alpha;
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
			return allcaps ? "Calm down, I know what I'm doing!" : "Sure.";
		}
		return allcaps ? "Whoa, chill out!" : "Whatever.";
	}
}  // namespace bob