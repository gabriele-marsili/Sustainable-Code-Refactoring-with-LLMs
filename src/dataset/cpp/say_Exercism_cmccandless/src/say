#include "say.h"

namespace say
{
	constexpr array<const char*, 20> digits{ "zero","one","two","three","four","five","six","seven","eight","nine","ten",
	"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen" };
	constexpr array<const char*, 10> tens{ "","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety" };
	constexpr array<pair<unsigned long long, const char*>, 4> modifiers
	{
		pair{1000000000ULL, " billion"},
		pair{1000000ULL, " million"},
		pair{1000ULL, " thousand"},
		pair{100ULL, " hundred"},
	};

	string in_english(unsigned long long x)
	{
		if (x > -1ULL) throw domain_error("Negative number.");
		if (x < 20) return digits[x];
		if (x < 100)
		{
			string result = tens[x / 10];
			if (unsigned long long r = x % 10; r > 0) result += "-" + digits[r];
			return result;
		}
		for (const auto& [mod, label] : modifiers)
		{
			if (mod > x) continue;
			unsigned long long q = x / mod;
			if (q > 999) throw domain_error("Too large.");
			string result = in_english(q) + label;
			if (unsigned long long r = x % mod; r > 0) result += " " + in_english(r);
			return result;
		}
		throw domain_error("Invalid.");
	}
}