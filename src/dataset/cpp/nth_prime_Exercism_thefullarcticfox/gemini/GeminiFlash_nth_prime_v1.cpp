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

  // Estimate the upper bound for the nth prime number.  This is crucial for
  // performance.  A good approximation is n * log(n) + n * log(log(n))
  // for n >= 6.  We handle smaller n separately.
  int upper_bound;
  if (n < 6) {
    upper_bound = 20; // Empirical upper bound for n < 6
  } else {
    double n_double = static_cast<double>(n);
    upper_bound = static_cast<int>(n_double * (std::log(n_double) + std::log(std::log(n_double))));

    // Ensure a minimum size to avoid issues with small n values and log(log(n))
    upper_bound = std::max(upper_bound, 20);
  }

  std::vector<bool> is_prime(upper_bound + 1, true);
  is_prime[0] = is_prime[1] = false;

  // Sieve of Eratosthenes optimization: start from p*p, iterate by p
  for (int p = 2; p * p <= upper_bound; ++p) {
    if (is_prime[p]) {
      for (int i = p * p; i <= upper_bound; i += p) {
        is_prime[i] = false;
      }
    }
  }

  // Collect the primes.  Stop when we've found the nth prime.
  int count = 0;
  for (int i = 2; i <= upper_bound; ++i) {
    if (is_prime[i]) {
      ++count;
      if (count == n) {
        return i;
      }
    }
  }

  // This should be unreachable with a correctly calculated upper_bound.
  // However, if the upper bound is too small, we throw an exception.
  throw std::runtime_error("Upper bound was insufficient to find nth prime.");
}

} // namespace nth_prime