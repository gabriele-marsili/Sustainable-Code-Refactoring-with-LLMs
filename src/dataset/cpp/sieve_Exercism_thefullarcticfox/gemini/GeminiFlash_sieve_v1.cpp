#include "sieve.h"
#include <vector>
#include <cmath>

namespace sieve {

std::vector<int> primes(int n) {
  if (n < 2) {
    return {};
  }

  std::vector<bool> is_prime(n + 1, true);
  is_prime[0] = is_prime[1] = false;

  // Optimization 1: Iterate only up to the square root of n
  for (int p = 2; p * p <= n; ++p) {
    if (is_prime[p]) {
      // Optimization 2: Start marking multiples from p*p
      for (int i = p * p; i <= n; i += p) {
        is_prime[i] = false;
      }
    }
  }

  std::vector<int> prime_numbers;
  // Optimization 3: Reserve space to avoid reallocations
  prime_numbers.reserve(n / 2); // Heuristic: primes are less frequent than composites

  for (int i = 2; i <= n; ++i) {
    if (is_prime[i]) {
      prime_numbers.push_back(i);
    }
  }

  return prime_numbers;
}

} // namespace sieve