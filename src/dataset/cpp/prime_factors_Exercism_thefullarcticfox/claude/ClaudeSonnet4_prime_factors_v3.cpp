#include "prime_factors.h"
#include <cmath>

namespace prime_factors {
	std::vector<int> of(int num) {
		if (num <= 1) return {};
		
		std::vector<int> res;
		res.reserve(32 - __builtin_clz(num));

		while (num % 2 == 0) {
			res.push_back(2);
			num >>= 1;
		}

		int limit = static_cast<int>(std::sqrt(num));
		for (int i = 3; i <= limit; i += 2) {
			while (num % i == 0) {
				res.push_back(i);
				num /= i;
			}
			if (num == 1) break;
			if (i * i > num) {
				limit = static_cast<int>(std::sqrt(num));
			}
		}

		if (num > 1) {
			res.push_back(num);
		}

		return res;
	}
}