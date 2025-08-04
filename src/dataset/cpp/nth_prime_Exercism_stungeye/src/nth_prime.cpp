#include "nth_prime.h"
#include <cmath>
#include <limits>
#include <stdexcept>

namespace nth_prime {

	int nth(int n) {
		if (n == 0) throw std::domain_error("There is no 0th prime number");

		for (int i = 2, count = 0; i < std::numeric_limits<int>::max(); i++) {
			if (isPrime(i)) ++count;
			if (count == n) return i;
		}

		throw std::domain_error("Ran out of prime candidates in the integer range.");
	}

	bool isPrime(int n) {
		const int maxRelevantDivisor = static_cast<int>(std::sqrt(n));

		for (int i = 2; i <= maxRelevantDivisor; i += 1) {
			if (n % i == 0) return false;
		}

		return true;
	}
} // namespace nth_prime
