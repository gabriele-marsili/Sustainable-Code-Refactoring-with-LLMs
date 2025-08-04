#include "sieve.h"

#include <algorithm> // std::ranges::generate
#include <numeric>   // std::iota

namespace sieve {
	constexpr int smallestPrime{2};

	std::vector<int> primes(const int limit) {
		if (limit < smallestPrime) return {};

		// Fill potentialPrimes with integers 2 to limit, inclusive.
		std::vector<int> potentialPrimes(limit - 1);
		std::iota(potentialPrimes.begin(), potentialPrimes.end(), smallestPrime);

		// Remove multiples of each prime number from potential candidates.
		for (auto prime : potentialPrimes) {
			std::erase_if(potentialPrimes, [prime](auto num) {
				return prime != num && num % prime == 0;
			});
		}

		return potentialPrimes;
	}

	std::vector<int> primesOptimized(const int limit) {
		if (limit < smallestPrime) return {};

		// Fill potentialPrimes with odd integers from 3 to limit.
		std::vector<int> potentialPrimes((limit - 1) / 2);
		std::ranges::generate(potentialPrimes, [n = smallestPrime - 1]() mutable {
			n += 2;
			return n;
		});

		// Remove multiples of each prime number from potential candidates.
		for (auto prime : potentialPrimes) {
			std::erase_if(potentialPrimes, [prime](auto num) {
				return prime != num && num % prime == 0;
			});
		}

		// 2 is the only even prime, so you add it to the front manually.
		potentialPrimes.insert(potentialPrimes.begin(), smallestPrime);

		return potentialPrimes;
	}

	std::vector<int> primesCpp17(int limit) {
		if (limit < smallestPrime) return {};

		// Fill potentialPrimes with integers 2 to limit, inclusive.
		std::vector<int> potentialPrimes(limit - 1);
		std::iota(potentialPrimes.begin(), potentialPrimes.end(), smallestPrime);

		for (auto prime : potentialPrimes) {
			// Using Erase-Remove Idiom: https://en.wikipedia.org/wiki/Erase%E2%80%93remove_idiom
			potentialPrimes.erase(std::remove_if(potentialPrimes.begin(),
				potentialPrimes.end(),
				[prime](auto num) {
					return prime != num && num % prime == 0;
				}),
				potentialPrimes.end());
		}

		return potentialPrimes;
	}


} // namespace sieve
