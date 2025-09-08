#include "nth_prime.h"
#include <vector>
#include <stdexcept>
#include <cmath>

namespace nth_prime {
	int nth(int n) {
		if (n <= 0) {
			throw std::domain_error("can't find zero or negative nth prime");
		}

		if (n == 1) {
			return 2;
		}

		// Estimate the upper bound for the nth prime number.  This is crucial for performance.
		// A good approximation is n * log(n) + n * log(log(n)) for larger n.  For smaller n,
		// this can be an underestimate, so we add a bit of a buffer.
		long upper_bound = static_cast<long>(n * (std::log(n) + std::log(std::log(n))));
		if (upper_bound < 0) {
			upper_bound = std::numeric_limits<long>::max() / 2; // Handle potential overflow
		}
		upper_bound = std::max(upper_bound, static_cast<long>(100)); // Ensure a minimum size
		upper_bound += upper_bound / 4; // Add a buffer to avoid out-of-bounds errors.

		std::vector<bool> is_prime(upper_bound + 1, true);
		is_prime[0] = is_prime[1] = false;

		// Sieve of Eratosthenes optimization: start from p*p, and only iterate up to sqrt(upper_bound)
		for (long p = 2; p * p <= upper_bound; ++p) {
			if (is_prime[p]) {
				for (long i = p * p; i <= upper_bound; i += p) {
					is_prime[i] = false;
				}
			}
		}

		// Count the primes and return the nth prime.  Avoid storing all primes in a vector.
		int prime_count = 0;
		for (long i = 2; i <= upper_bound; ++i) {
			if (is_prime[i]) {
				++prime_count;
				if (prime_count == n) {
					return static_cast<int>(i);
				}
			}
		}

		// This should be unreachable with a properly sized upper_bound, but handle the case where the estimate was too low.
		throw std::runtime_error("Upper bound was insufficient to find the nth prime.");
	}
} // namespace nth_prime