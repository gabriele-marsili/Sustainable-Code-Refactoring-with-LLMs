#include "bob.h"

namespace bob {
	std::string hey(std::string line) {
		line.erase(std::remove_if(line.begin(), line.end(), isspace), line.end());
		int upperCase = 0, lowerCase = 0, digitCase = 0;
		for (auto c : line) {
			if (isupper(c)) upperCase++;
			if (islower(c)) lowerCase++;
			if (isdigit(c)) digitCase++;
		}

		if (line.size() == 0)
			return "Fine. Be that way!";
		else if (lowerCase == 0 && upperCase > 0 && line[line.size() - 1] == '?' && digitCase == 0)
			return "Calm down, I know what I'm doing!";
		else if (upperCase > 0 && digitCase > 0 && lowerCase == 0)
			return "Whoa, chill out!";
		else if (upperCase > 6)
			return "Whoa, chill out!";
		else if (line[line.size() - 1] == '?')
			return "Sure.";
		else
			return "Whatever.";
	}
}  // namespace bob
