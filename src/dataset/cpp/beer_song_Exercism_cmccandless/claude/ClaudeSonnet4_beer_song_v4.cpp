#include "beer_song.h"

namespace beer
{
	string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

	string verse(int n)
	{
		string result;
		result.reserve(150);
		
		const string& b = bottles(n);
		
		if (n > 0) {
			result += to_string(n);
		} else {
			result += "No more";
		}
		result += b;
		result += " of beer on the wall, ";
		
		if (n > 0) {
			result += to_string(n);
		} else {
			result += "no more";
		}
		result += b;
		result += " of beer.\n";
		
		if (n > 0) {
			result += "Take ";
			result += (n == 1 ? "it" : "one");
			result += " down and pass it around, ";
			if (n == 1) {
				result += "no more";
			} else {
				result += to_string(n - 1);
			}
		} else {
			result += "Go to the store and buy some more, 99";
		}
		result += bottles(n - 1);
		result += " of beer on the wall.\n";
		
		return result;
	}

	string sing(int start, int stop)
	{
		string result;
		result.reserve((start - stop + 1) * 150);
		
		for (int i = start; i >= stop; --i) {
			result += verse(i);
			if (i > stop) {
				result += '\n';
			}
		}
		return result;
	}
}