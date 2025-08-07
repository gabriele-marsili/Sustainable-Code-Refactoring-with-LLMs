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

	// Early return for silence
	if (spaces_only)
		return "Fine. Be that way!";

	// Check for yelling
	if (all_uppercase && has_alpha)
	{
		// Check if it's also a question by looking for trailing question mark
		for (int i = statement.length() - 1; i >= 0; --i)
		{
			if (statement[i] == '?')
				return "Calm down, I know what I'm doing!";
			else if (!isspace(statement[i]))
				break;
		}
		return "Whoa, chill out!";
	}

	// Check for question
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