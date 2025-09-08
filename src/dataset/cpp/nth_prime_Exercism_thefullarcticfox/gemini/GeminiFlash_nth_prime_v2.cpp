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

  // Estimate the upper bound for the nth prime number.  This avoids allocating
  // a huge vector unnecessarily.  A better estimation function could be used.
  // This one is based on the prime number theorem.
  long upper_bound = static_cast<long>(n * (log(n) + log(log(n))));
  if (upper_bound < 0) {
      upper_bound = 1000000; // Fallback if estimation fails (overflow).  Still large, but avoids immediate crash.
  }
  if (upper_bound < 100) upper_bound = 100; // Ensure a reasonable minimum size

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

  // Count the primes to find the nth prime.  No need to store all primes.
  int count = 0;
  for (long p = 2; p <= upper_bound; ++p) {
    if (is_prime[p]) {
      ++count;
      if (count == n) {
        return static_cast<int>(p);
      }
    }
  }

  // Should not happen if the upper bound estimation is correct, but handle the
  // case where the upper bound is too small.  This is now handled by the dynamic upper bound.
  throw std::runtime_error("Upper bound was too small.  Increase it.");
}

} // namespace nth_prime