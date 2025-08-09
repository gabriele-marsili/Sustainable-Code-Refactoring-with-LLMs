#include "bob.h"

string bob::hey(string input)
{
	int n = input.size();
	
	// Find last non-space character
	while (n > 0 && input[n - 1] == ' ') n--;
	if (n == 0) return "Fine. Be that way!";
	
	bool isShouting = false;
	bool hasLetter = false;
	
	// Single pass to check for letters and shouting
	for (int i = 0; i < n; i++)
	{
		char ch = input[i];
		if (isalpha(ch))
		{
			hasLetter = true;
			if (islower(ch))
			{
				isShouting = false;
				break;
			}
			else
			{
				isShouting = true;
			}
		}
	}
	
	if (hasLetter && isShouting) return "Whoa, chill out!";
	if (input[n - 1] == '?') return "Sure.";
	return "Whatever.";
}