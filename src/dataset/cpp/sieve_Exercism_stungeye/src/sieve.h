#if !defined(SIEVE_H)
#define SIEVE_H
#include <vector>

namespace sieve {
	std::vector<int> primesCpp17(int limit); // CPP17
	std::vector<int> primes(int limit); // CPP20
	std::vector<int> primesOptimized(int limit); // CPP20 + Optimizations
}  // namespace sieve

#endif // SIEVE_H