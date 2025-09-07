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
		{100ULL, " hundred"},
	};

	string in_english(unsigned long long x)
	{
		if (x == 0) return digits[0];
		if (x < 20) return digits[x];
		if (x < 100)
		{
			string result = tens[x / 10];
			unsigned long long r = x % 10;
			if (r > 0) result += "-" + digits[r];
			return result;
		}
		for (const auto &t : modifiers)
		{
			if (t.first > x) continue;
			unsigned long long q = x / t.first;
			if (q > 999) throw domain_error("Too large.");
			string result = in_english(q) + t.second;
			unsigned long long r = x % t.first;
			if (r > 0) result += " " + in_english(r);
			return result;
		}
		throw domain_error("Invalid.");
	}
}