#include "beer_song.h"
#include <string>
#include <sstream>

namespace beer
{
	std::string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

	std::string verse(int n)
	{
		std::string result;
		result.reserve(256);

		std::string b = bottles(n);
		std::string count = (n > 0) ? std::to_string(n) : "No more";

		result += count + b + " of beer on the wall, " + count + b + " of beer.\n";

		if (n > 0)
		{
			result += "Take " + std::string((n == 1) ? "it" : "one") + " down and pass it around, ";
			result += (n == 1) ? "no more" : std::to_string(n - 1);
		}
		else
		{
			result += "Go to the store and buy some more, 99";
		}

		result += bottles(n - 1) + " of beer on the wall.\n";
		return result;
	}

	std::string sing(int start, int stop)
	{
		std::string result;
		for (int i = start; i >= stop; --i)
		{
			result += verse(i);
			if (i > stop)
			{
				result += '\n';
			}
		}
		return result;
	}
}