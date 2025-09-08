#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>

namespace all_your_base {
	using namespace std;
	using uint = unsigned int;

	vector<uint>	convert(uint inbase, const vector<uint>& indigits, uint outbase) {
		if (inbase < 2 || outbase < 2)
			throw invalid_argument("base is lower than possible");

		if (indigits.empty())
			return vector<uint>();

		bool all_zero = true;
		for (uint indigit : indigits) {
			if (indigit >= inbase)
				throw invalid_argument("impossible number for inbase");
			if (indigit != 0)
				all_zero = false;
		}

		if (all_zero)
			return vector<uint>();

		vector<uint> res;
		res.reserve(indigits.size() * 2);
		res.push_back(0);

		for (uint indigit : indigits) {
			uint carry = indigit;
			const size_t size = res.size();
			
			for (size_t i = 0; i < size; ++i) {
				const uint d = res[i] * inbase + carry;
				res[i] = d % outbase;
				carry = d / outbase;
			}

			while (carry > 0) {
				res.push_back(carry % outbase);
				carry /= outbase;
			}
		}

		reverse(res.begin(), res.end());
		return res;
	}
}  // namespace all_your_base