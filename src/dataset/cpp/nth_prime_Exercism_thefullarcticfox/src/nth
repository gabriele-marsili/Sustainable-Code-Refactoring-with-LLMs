#include "nth_prime.h"
#include <vector>
#include <stdexcept>
#include <cmath>

namespace nth_prime {
	int nth(int n) {
		if (n == 0)
			throw std::domain_error("can't find zero");
		if (n == 1)
			return 2;

		// Estimate upper bound for nth prime using the approximation n * log(n) + n * log(log(n))
		// This is sufficient for reasonably large n
		int upper_bound = (n > 5) ? static_cast<int>(n * std::log(n) + n * std::log(std::log(n))) : 15;

		std::vector<bool> isprime(upper_bound + 1, true);
		isprime[0] = isprime[1] = false;

		for (size_t p = 2; p <= std::sqrt(upper_bound); ++p) {
			if (isprime[p]) {
				for (size_t i = p * p; i <= upper_bound; i += p)
					isprime[i] = false;
			}
		}

		int count = 0;
		for (size_t i = 2; i <= upper_bound; ++i) {
			if (isprime[i]) {
				++count;
				if (count == n)
					return i;
			}
		}

		// In case the upper bound was underestimated (unlikely for large n)
		throw std::runtime_error("Upper bound insufficient to find nth prime");
	}
}  // namespace nth_prime