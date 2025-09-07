#include "say.h"

namespace say
{
	static const vector<string> digits{ "zero","one","two","three","four","five","six","seven","eight","nine","ten",
	"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen" };
	static const vector<string> tens{ "","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety" };
	static const pair<unsigned long long, const char*> modifiers[] = {
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
			const auto quotient = x / 10;
			const auto remainder = x % 10;
			return remainder > 0 ? tens[quotient] + "-" + digits[remainder] : tens[quotient];
		}
		
		for (const auto& mod : modifiers)
		{
			if (mod.first > x) continue;
			const auto quotient = x / mod.first;
			if (quotient > 999) throw domain_error("Too large.");
			string result = in_english(quotient) + mod.second;
			const auto remainder = x % mod.first;
			if (remainder > 0) result += " " + in_english(remainder);
			return result;
		}
		throw domain_error("Invalid.");
	}
}