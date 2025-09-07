#include "prime_factors.h"
#include <cmath>

namespace prime_factors {
	std::vector<int> of(int num) {
		std::vector<int> res;
		res.reserve(20);

		while (num % 2 == 0) {
			res.push_back(2);
			num /= 2;
		}

		for (int i = 3, limit = std::sqrt(num); i <= limit; i += 2) {
			while (num % i == 0) {
				res.push_back(i);
				num /= i;
				limit = std::sqrt(num);
			}
		}

		if (num > 1) {
			res.push_back(num);
		}

		return res;
	}
}  // namespace prime_factors