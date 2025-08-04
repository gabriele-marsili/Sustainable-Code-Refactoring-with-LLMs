#include "sieve.h"
#include <stdexcept>
using std::vector;

namespace sieve {
	vector<int>	primes(int n) {
		vector<bool>	isprime(n + 1, true);
		for (size_t p = 2; p < isprime.size(); p++) {
			if (isprime.at(p)) {
				for (size_t i = p * p; i < isprime.size(); i += p)
					isprime.at(i) = false;
			}
		}

		vector<int>		primes;
		for (size_t i = 2; i < isprime.size(); i++)
			if (isprime.at(i))
				primes.push_back(i);

		return (primes);
	}
}  // namespace sieve
