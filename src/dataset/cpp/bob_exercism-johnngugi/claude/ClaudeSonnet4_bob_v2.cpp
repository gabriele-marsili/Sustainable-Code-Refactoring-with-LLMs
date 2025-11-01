#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
	bool spaces_only = true;
	bool all_uppercase = true;
	bool has_alpha = false;
	bool has_question_mark = false;

	// Single pass through the string
	for (int i = 0; i < statement.length(); ++i)
	{
		char c = statement[i];
		
		if (!isspace(c))
		{
			spaces_only = false;
			
			if (isalpha(c))
			{
				has_alpha = true;
				if (!isupper(c))
					all_uppercase = false;
			}
		}
		
		if (c == '?')
			has_question_mark = true;
	}

	if (spaces_only)
		return "Fine. Be that way!";
	
	if (all_uppercase && has_alpha)
		return "Whoa, chill out!";

	// Check for question mark at end (ignoring trailing spaces)
	if (has_question_mark)
	{
		for (int i = statement.length() - 1; i >= 0; --i)
		{
			if (statement[i] == '?')
				return "Sure.";
			else if (!isspace(statement[i]))
				break;
		}
	}

	return "Whatever.";
}