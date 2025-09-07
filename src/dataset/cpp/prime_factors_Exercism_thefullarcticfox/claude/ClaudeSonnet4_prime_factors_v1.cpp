#include "prime_factors.h"
#include <cmath>

namespace prime_factors {
	std::vector<int>		of(int num) {
		std::vector<int>	res;
		
		if (num <= 1) return res;
		
		// Handle factor 2
		while (num % 2 == 0) {
			res.push_back(2);
			num >>= 1;  // Faster division by 2
		}

		// Check odd factors up to sqrt(num)
		int limit = static_cast<int>(std::sqrt(num));
		for (int i = 3; i <= limit; i += 2) {
			while (num % i == 0) {
				res.push_back(i);
				num /= i;
			}
			// Update limit as num gets smaller
			if (num > 1) {
				limit = static_cast<int>(std::sqrt(num));
			}
		}

		// If num > 1, then it's a prime factor
		if (num > 1) {
			res.push_back(num);
		}

		return res;
	}
}  // namespace prime_factors