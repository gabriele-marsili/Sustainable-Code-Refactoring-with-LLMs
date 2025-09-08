#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>

namespace all_your_base {
	using namespace std;
	using uint = unsigned int;

	vector<uint>	convert(uint inbase, const vector<uint>& indigits, uint outbase) {
		if (inbase < 2 || outbase < 2)
			throw invalid_argument("base is lower than possible");

		// Handle empty input
		if (indigits.empty())
			return vector<uint>(1, 0);

		// Check for leading zeros and find first non-zero digit
		size_t start = 0;
		while (start < indigits.size() && indigits[start] == 0)
			++start;
		
		// All zeros case
		if (start == indigits.size())
			return vector<uint>(1, 0);

		vector<uint> res;
		res.reserve(indigits.size() * 2); // More accurate initial capacity

		for (size_t i = start; i < indigits.size(); ++i) {
			uint indigit = indigits[i];
			if (indigit >= inbase)
				throw invalid_argument("impossible number for inbase");

			uint carry = indigit;
			for (uint& digit : res) {
				uint d = digit * inbase + carry;
				digit = d % outbase;
				carry = d / outbase;
			}

			while (carry > 0) {
				res.push_back(carry % outbase);
				carry /= outbase;
			}
		}

		if (res.empty())
			res.push_back(0);

		reverse(res.begin(), res.end());
		return res;
	}
}  // namespace all_your_base