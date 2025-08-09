#include "bob.h"

namespace bob {
	bool has_only_caps_letters(const std::string& str) {
		bool has_letter = false;
		
		for (char c : str) {
			if (std::isalpha(c)) {
				has_letter = true;
				if (std::islower(c))
					return false;
			}
		}
		return has_letter;
	}

	std::string hey(const std::string& query) {
		if (query.empty())
			return "Fine. Be that way!";
		
		size_t lastnonspace = query.find_last_not_of(" \t\n\v\f\r");
		if (lastnonspace == std::string::npos)
			return "Fine. Be that way!";

		bool is_question = query[lastnonspace] == '?';
		bool allcaps = has_only_caps_letters(query);

		if (is_question) {
			return allcaps ? "Calm down, I know what I'm doing!" : "Sure.";
		}
		
		return allcaps ? "Whoa, chill out!" : "Whatever.";
	}
}