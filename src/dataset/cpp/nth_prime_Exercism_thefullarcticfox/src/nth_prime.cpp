#include "nth_prime.h"
#include <vector>
#include <stdexcept>

namespace nth_prime {
	int		nth(int n) {
		if (n == 0)
			throw std::domain_error("can't find zero");
		if (n == 1)
			return (2);

		//	it's easy but it's stupid
		std::vector<bool>	isprime(1000000, true);
		for (size_t p = 2; p < isprime.size(); p++) {
			if (isprime.at(p)) {
				for (size_t i = p * p; i < isprime.size(); i += p)
					isprime.at(i) = false;
			}
		}

		std::vector<int>	primes;
		for (size_t i = 2; i < isprime.size(); i++)
			if (isprime.at(i))
				primes.push_back(i);

		return (primes.at(n - 1));
	}
}  // namespace nth_prime
