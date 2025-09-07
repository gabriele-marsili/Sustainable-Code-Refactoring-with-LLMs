#include "prime_factors.h"
#include <cmath>

namespace prime_factors {
	std::vector<int> of(int num) {
		std::vector<int> res;
		res.reserve(10);

		while (num % 2 == 0) {
			res.push_back(2);
			num /= 2;
		}

		if (num > 1) {
			int limit = static_cast<int>(std::sqrt(num)) + 1;
			for (int i = 3; i <= limit; i += 2) {
				while (num % i == 0) {
					res.push_back(i);
					num /= i;
					limit = static_cast<int>(std::sqrt(num)) + 1;
				}
			}

			if (num > 1) {
				res.push_back(num);
			}
		}

		return res;
	}
}  // namespace prime_factors