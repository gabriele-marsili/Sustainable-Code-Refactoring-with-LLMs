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

		// Estimate the upper bound for the nth prime number.  This is crucial for memory efficiency.
		// A good approximation is n * log(n) + n * log(log(n)) for larger n.  For smaller n, we'll use a more conservative estimate.
		int upper_bound;
		if (n < 6) {
			upper_bound = 20; // Small primes are close together.
		} else {
			double log_n = std::log(n);
			upper_bound = static_cast<int>(n * (log_n + std::log(log_n)));

			// Ensure a minimum size and add a buffer for safety.
			upper_bound = std::max(upper_bound, 2 * n);
			upper_bound += 100; // Add a small buffer
		}

		std::vector<bool> is_prime(upper_bound + 1, true); // +1 to include upper_bound itself
		is_prime[0] = is_prime[1] = false;

		// Sieve of Eratosthenes: Optimized for memory and speed.
		for (int p = 2; p * p <= upper_bound; ++p) {
			if (is_prime[p]) {
				// Start marking multiples from p*p, as smaller multiples are already marked.
				for (int i = p * p; i <= upper_bound; i += p) {
					is_prime[i] = false;
				}
			}
		}

		// Count the primes to find the nth prime.  This avoids storing all primes in a separate vector.
		int prime_count = 0;
		int nth_prime = 0;
		for (int i = 2; i <= upper_bound; ++i) {
			if (is_prime[i]) {
				prime_count++;
				if (prime_count == n) {
					nth_prime = i;
					break; // Found the nth prime, no need to continue.
				}
			}
		}

		return nth_prime;
	}
} // namespace nth_prime