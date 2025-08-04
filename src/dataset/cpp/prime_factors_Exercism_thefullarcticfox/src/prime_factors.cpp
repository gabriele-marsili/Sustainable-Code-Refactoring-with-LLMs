#include "prime_factors.h"

namespace prime_factors {
	std::vector<int>		of(int num) {
		std::vector<int>	res;
		res.reserve(20);

		while (num % 2 == 0) {
			res.push_back(2);
			num /= 2;
		}

		for (int i = 3; i <= num; i += 2) {
			while (num % i == 0) {
				res.push_back(i);
				num /= i;
			}
		}

		return (res);
	}
}  // namespace prime_factors
