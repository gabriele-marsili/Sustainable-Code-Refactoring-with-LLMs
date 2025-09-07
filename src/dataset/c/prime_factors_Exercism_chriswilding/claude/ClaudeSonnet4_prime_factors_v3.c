#include "prime_factors.h"

#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
  size_t i = 0;

  while (n % 2 == 0) {
    n >>= 1;
    factors[i++] = 2;
  }

  uint64_t limit = (uint64_t)sqrt(n);
  for (uint64_t j = 3; j <= limit; j += 2) {
    while (n % j == 0) {
      n /= j;
      factors[i++] = j;
    }
    if (n == 1) break;
    if (j * j > n) {
      limit = (uint64_t)sqrt(n);
    }
  }

  if (n > 2) {
    factors[i++] = n;
  }

  return i;
}