#include "prime_factors.h"

namespace prime_factors {
	std::vector<int> of(int num) {
		std::vector<int> res;

		while (num % 2 == 0) {
			res.push_back(2);
			num /= 2;
		}

		for (int i = 3; i * i <= num; i += 2) {
			while (num % i == 0) {
				res.push_back(i);
				num /= i;
			}
		}

		if (num > 1) {
			res.push_back(num);
		}

		return res;
	}
}  // namespace prime_factors