#include "nth_prime.h"
#include <vector>
#include <stdexcept>

namespace nth_prime {
	int		nth(int n) {
		if (n == 0)
			throw std::domain_error("can't find zero");
		if (n == 1)
			return 2;
		if (n == 2)
			return 3;

		std::vector<int> primes;
		primes.reserve(n);
		primes.push_back(2);
		primes.push_back(3);

		int candidate = 5;
		while (primes.size() < static_cast<size_t>(n)) {
			bool is_prime = true;
			int sqrt_candidate = static_cast<int>(candidate * candidate);
			
			for (size_t i = 1; i < primes.size() && primes[i] * primes[i] <= candidate; ++i) {
				if (candidate % primes[i] == 0) {
					is_prime = false;
					break;
				}
			}
			
			if (is_prime) {
				primes.push_back(candidate);
			}
			
			candidate += 2;
		}

		return primes[n - 1];
	}
}  // namespace nth_prime