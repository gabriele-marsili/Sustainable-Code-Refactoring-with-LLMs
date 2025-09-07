#include "say.h"
#include <array>

namespace say
{
	const std::array<const char*, 20> digits{ "zero","one","two","three","four","five","six","seven","eight","nine","ten",
	"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen" };
	const std::array<const char*, 10> tens{ "","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety" };
	const std::array<std::pair<unsigned long long, const char*>, 4> modifiers
	{ {
		{1000000000ULL, " billion"},
		{1000000ULL, " million"},
		{1000ULL, " thousand"},
		{100ULL, " hundred"},
	} };

	string in_english(unsigned long long x)
	{
		if (x >= 1000000000000ULL) throw domain_error("Too large.");
		if (x < 20) return digits[x];
		if (x < 100)
		{
			std::string result = tens[x / 10];
			unsigned long long r = x % 10;
			if (r > 0) result += "-" + std::string(digits[r]);
			return result;
		}
		for (const auto& t : modifiers)
		{
			unsigned long long mod = t.first;
			const char* label = t.second;
			if (x >= mod)
			{
				unsigned long long q = x / mod;
				std::string result = in_english(q) + label;
				unsigned long long r = x % mod;
				if (r > 0) result += " " + in_english(r);
				return result;
			}
		}
		throw domain_error("Invalid.");
	}
}