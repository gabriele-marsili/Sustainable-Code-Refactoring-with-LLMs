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

		uint decimal_value = 0;
		for (auto indigit : indigits) {
			if (indigit >= inbase)
				throw invalid_argument("impossible number for inbase");
			decimal_value = decimal_value * inbase + indigit;
		}

		vector<uint> res;
		while (decimal_value > 0) {
			res.push_back(decimal_value % outbase);
			decimal_value /= outbase;
		}

		reverse(res.begin(), res.end());
		return res;
	}
}  // namespace all_your_base