#include "sieve.h"

vector<int> sieve::primes(int max) {
  if (max <= 2) {
    return {};
  }

  std::vector<bool> is_prime(max, true);
  is_prime[0] = is_prime[1] = false;

  // Optimization 1: Start from 2 and only check odd numbers after that.
  for (int i = 2; i * i < max; ++i) {
    if (is_prime[i]) {
      // Optimization 2: Start marking multiples from i*i. Multiples before that
      // would have already been marked by smaller primes.
      for (int j = i * i; j < max; j += i) {
        is_prime[j] = false;
      }
    }
  }

  std::vector<int> primes_list;
  // Optimization 3: Reserve space to avoid reallocations.  A good estimate
  // for the number of primes less than max is max / ln(max).
  primes_list.reserve(static_cast<size_t>(max / std::log(max)));

  for (int i = 2; i < max; ++i) {
    if (is_prime[i]) {
      primes_list.push_back(i);
    }
  }

  return primes_list;
}