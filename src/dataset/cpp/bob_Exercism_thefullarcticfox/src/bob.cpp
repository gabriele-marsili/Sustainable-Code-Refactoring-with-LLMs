#include "bob.h"

namespace bob {
	bool		has_only_caps_letters(const std::string& str) {
		size_t	lettercount = 0;

		for (char c : str) {
			if (std::isalpha(c))
				lettercount++;
			if (std::islower(c))
				return false;
		}
		if (lettercount == 0)
			return false;
		return true;
	}

	std::string	hey(const std::string& query) {
		size_t	lastnonspace = query.find_last_not_of(" \t\n\v\f\r");
		if (lastnonspace == std::string::npos)
			return "Fine. Be that way!";

		bool	allcaps = has_only_caps_letters(query);

		if (query.at(lastnonspace) == '?') {
			if (allcaps)
				return "Calm down, I know what I'm doing!";
			return "Sure.";
		}

		if (allcaps)
			return "Whoa, chill out!";
		return "Whatever.";
	}
}  // namespace bob
