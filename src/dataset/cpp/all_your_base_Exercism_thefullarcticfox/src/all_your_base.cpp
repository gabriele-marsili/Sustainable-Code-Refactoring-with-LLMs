#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>

namespace all_your_base {
	using namespace std;
	using uint = unsigned int;

	vector<uint>	convert(uint inbase, const vector<uint>& indigits, uint outbase) {
		if (inbase < 2 || outbase < 2)
			throw invalid_argument("base is lower than possible");

		vector<uint>	res(1, 0);
		res.reserve(1000);

		for (auto indigit : indigits) {
			if (indigit >= inbase)
				throw invalid_argument("impossible number for inbase");

			uint carry = indigit;
			for (auto& digit : res) {
				uint d = digit * inbase + carry;
				digit = d % outbase;
				carry = d / outbase;
			}

			while (carry > 0) {
				res.push_back(carry % outbase);
				carry /= outbase;
			}
		}

		if (res.size() == 1 && res.at(0) == 0)
			res.pop_back();

		reverse(res.begin(), res.end());
		return (res);
	}
}  // namespace all_your_base
