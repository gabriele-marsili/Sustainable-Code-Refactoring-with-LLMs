#include "say.h"

namespace say
{
	static const vector<string> digits{ "zero","one","two","three","four","five","six","seven","eight","nine","ten",
	"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen" };
	static const vector<string> tens{ "","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety" };
	static const vector<pair<unsigned long long, const char*>> modifiers
	{
		{1000000000ULL, " billion"},
		{1000000ULL, " million"},
		{1000ULL, " thousand"},
		{100ULL, " hundred"}
	};

	string in_english(unsigned long long x)
	{
		if (x == 0) return digits[0];
		if (x < 20) return digits[x];
		if (x < 100)
		{
			string result = tens[x / 10];
			unsigned long long r = x % 10;
			if (r > 0) {
				result.reserve(result.size() + 1 + digits[r].size());
				result += "-" + digits[r];
			}
			return result;
		}
		
		for (const auto& modifier : modifiers)
		{
			if (modifier.first > x) continue;
			unsigned long long q = x / modifier.first;
			if (q > 999) throw domain_error("Too large.");
			
			string result = in_english(q) + modifier.second;
			unsigned long long r = x % modifier.first;
			if (r > 0) {
				string remainder = in_english(r);
				result.reserve(result.size() + 1 + remainder.size());
				result += " " + remainder;
			}
			return result;
		}
		throw domain_error("Invalid.");
	}
}