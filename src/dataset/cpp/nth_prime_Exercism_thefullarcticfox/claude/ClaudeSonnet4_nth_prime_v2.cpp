#include "nth_prime.h"
#include <vector>
#include <stdexcept>
#include <cmath>

namespace nth_prime {
	int		nth(int n) {
		if (n == 0)
			throw std::domain_error("can't find zero");
		if (n == 1)
			return 2;
		if (n == 2)
			return 3;

		// Estimate upper bound for nth prime using prime number theorem
		int limit = n < 6 ? 12 : static_cast<int>(n * (std::log(n) + std::log(std::log(n))));
		
		std::vector<bool> isprime(limit, true);
		isprime[0] = isprime[1] = false;
		
		int sqrt_limit = static_cast<int>(std::sqrt(limit));
		for (int p = 2; p <= sqrt_limit; ++p) {
			if (isprime[p]) {
				for (int i = p * p; i < limit; i += p)
					isprime[i] = false;
			}
		}

		int count = 0;
		for (int i = 2; i < limit; ++i) {
			if (isprime[i]) {
				++count;
				if (count == n)
					return i;
			}
		}

		throw std::runtime_error("nth prime not found within calculated limit");
	}
}  // namespace nth_prime