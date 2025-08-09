#include "bob.h"

string bob::hey(string input)
{
	// Find last non-space character
	int n = input.size();
	while (n > 0 && input[n - 1] == ' ') n--;
	if (n == 0) return "Fine. Be that way!";
	
	bool isShouting = false;
	bool hasLetter = false;
	
	// Single pass through the string
	for (int i = 0; i < n; i++)
	{
		char ch = input[i];
		if (isalpha(ch))
		{
			hasLetter = true;
			if (ch >= 'A' && ch <= 'Z')
			{
				isShouting = true;
			}
			else
			{
				isShouting = false;
				break;
			}
		}
	}
	
	if (hasLetter && isShouting) return "Whoa, chill out!";
	if (input[n - 1] == '?') return "Sure.";
	return "Whatever.";
}