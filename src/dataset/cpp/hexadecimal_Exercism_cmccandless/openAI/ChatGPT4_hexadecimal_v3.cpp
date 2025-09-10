#include "hexadecimal.h"

int hexadecimal::convert(const string& s)
{
	int result = 0;
	for (char ch : s)
	{
		if (isdigit(ch)) result = (result << 4) + (ch - '0');
		else if (ch >= 'a' && ch <= 'f') result = (result << 4) + (ch - 'a' + 10);
		else return 0;
	}
	return result;
}