#include "sieve.h"
#include <stdexcept>
using std::vector;

namespace sieve {
	vector<int>	primes(int n) {
		if (n < 2) return vector<int>();
		
		vector<bool>	isprime(n + 1, true);
		isprime[0] = isprime[1] = false;
		
		for (int p = 2; p * p <= n; ++p) {
			if (isprime[p]) {
				for (int i = p * p; i <= n; i += p)
					isprime[i] = false;
			}
		}

		vector<int> result;
		int count = 0;
		for (int i = 2; i <= n; ++i)
			if (isprime[i]) ++count;
		
		result.reserve(count);
		for (int i = 2; i <= n; ++i)
			if (isprime[i])
				result.push_back(i);

		return result;
	}
}