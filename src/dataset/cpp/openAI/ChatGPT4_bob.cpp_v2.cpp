#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
	bool has_letters = false;
	bool all_uppercase = true;
	bool only_spaces = true;

	for (char c : statement)
	{
		if (!isspace(c))
			only_spaces = false;

		if (isalpha(c))
		{
			has_letters = true;
			if (!isupper(c))
				all_uppercase = false;
		}
	}

	if (only_spaces)
		return "Fine. Be that way!";
	if (has_letters && all_uppercase)
		return "Whoa, chill out!";

	for (auto it = statement.rbegin(); it != statement.rend(); ++it)
	{
		if (isspace(*it))
			continue;
		if (*it == '?')
			return "Sure.";
		break;
	}

	return "Whatever.";
}