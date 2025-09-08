#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>

namespace all_your_base {
	using namespace std;
	using uint = unsigned int;

	vector<uint> convert(uint inbase, const vector<uint>& indigits, uint outbase) {
		if (inbase < 2 || outbase < 2)
			throw invalid_argument("base is lower than possible");

		if (indigits.empty() || (indigits.size() == 1 && indigits[0] == 0))
			return {0};

		vector<uint> res;

		for (auto indigit : indigits) {
			if (indigit >= inbase)
				throw invalid_argument("impossible number for inbase");

			uint carry = indigit;
			for (auto& digit : res) {
				carry += digit * inbase;
				digit = carry % outbase;
				carry /= outbase;
			}

			while (carry > 0) {
				res.push_back(carry % outbase);
				carry /= outbase;
			}
		}

		while (!res.empty() && res.back() == 0)
			res.pop_back();

		reverse(res.begin(), res.end());
		return res;
	}
}  // namespace all_your_base