#include "prime_factors.h"

#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
  size_t i = 0;

  // Handle factor 2
  while (n % 2 == 0) {
    n >>= 1;  // Bit shift instead of division
    factors[i++] = 2;
  }

  // Handle odd factors up to sqrt(n)
  uint64_t limit = (uint64_t)sqrt(n);
  for (uint64_t j = 3; j <= limit; j += 2) {
    while (n % j == 0) {
      n /= j;
      factors[i++] = j;
      limit = (uint64_t)sqrt(n);  // Update limit as n decreases
    }
  }

  // If n is still > 1, then it's a prime factor
  if (n > 1) {
    factors[i++] = n;
  }

  return i;
}