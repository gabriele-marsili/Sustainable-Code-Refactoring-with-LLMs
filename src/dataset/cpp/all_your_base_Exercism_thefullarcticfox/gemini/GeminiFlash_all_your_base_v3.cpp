#include "all_your_base.h"
#include <stdexcept>
#include <algorithm>
#include <numeric>
#include <vector>

namespace all_your_base {
	using namespace std;
	using uint = unsigned int;

	vector<uint> convert(uint inbase, const vector<uint>& indigits, uint outbase) {
		if (inbase < 2 || outbase < 2) {
			throw invalid_argument("base is lower than possible");
		}

		if (indigits.empty()) {
			return { };
		}

		for (uint indigit : indigits) {
			if (indigit >= inbase) {
				throw invalid_argument("impossible number for inbase");
			}
		}

		uintmax_t value = 0;
		for (uint digit : indigits) {
			value = value * inbase + digit;
		}

		if (value == 0) {
			return { };
		}

		vector<uint> result;
		while (value > 0) {
			result.push_back(static_cast<uint>(value % outbase));
			value /= outbase;
		}

		reverse(result.begin(), result.end());
		return result;
	}
}  // namespace all_your_base