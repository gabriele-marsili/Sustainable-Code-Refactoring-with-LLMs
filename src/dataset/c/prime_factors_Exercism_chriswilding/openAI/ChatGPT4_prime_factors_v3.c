#include "prime_factors.h"

#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
  size_t i = 0;

  while ((n & 1) == 0) {
    factors[i++] = 2;
    n >>= 1;
  }

  for (uint64_t j = 3; j * j <= n; j += 2) {
    while (n % j == 0) {
      factors[i++] = j;
      n /= j;
    }
  }

  if (n > 1) {
    factors[i++] = n;
  }

  return i;
}