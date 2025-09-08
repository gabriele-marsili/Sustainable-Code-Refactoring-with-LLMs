#include "beer_song.h"
#include <string>
#include <sstream>

namespace beer
{
	std::string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

	std::string verse(int n)
	{
		std::string result;
		std::string b = bottles(n);
		std::string first_line_num = (n > 0) ? std::to_string(n) : "No more";
		std::string second_line_num = (n > 0) ? std::to_string(n) : "no more";

		result.reserve(256); // Pre-allocate memory to avoid reallocations

		result += first_line_num;
		result += b + " of beer on the wall, ";
		result += second_line_num;
		result += b + " of beer.\n";

		if (n > 0)
		{
			result += "Take ";
			result += (n == 1 ? "it" : "one");
			result += " down and pass it around, ";
			result += (n == 1 ? "no more" : std::to_string(n - 1));
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
		result.reserve((start - stop + 1) * 256); // Pre-allocate memory

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