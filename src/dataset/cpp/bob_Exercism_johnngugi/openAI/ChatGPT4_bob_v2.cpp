#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
	bool has_letters = false;
	bool all_uppercase = true;
	bool has_question_mark = false;

	// Trim leading and trailing whitespace
	size_t start = statement.find_first_not_of(" \t\n\r\f\v");
	if (start == string::npos)
		return "Fine. Be that way!";
	size_t end = statement.find_last_not_of(" \t\n\r\f\v");
	string trimmed = statement.substr(start, end - start + 1);

	for (char c : trimmed)
	{
		if (isalpha(c))
		{
			has_letters = true;
			if (!isupper(c))
			{
				all_uppercase = false;
			}
		}
	}

	if (has_letters && all_uppercase)
		return "Whoa, chill out!";

	if (trimmed.back() == '?')
		return "Sure.";

	return "Whatever.";
}