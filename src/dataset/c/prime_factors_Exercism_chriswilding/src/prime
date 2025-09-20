#include "prime_factors.h"

#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
  int i = 0;

  while (n % 2 == 0) {
    factors[i++] = 2;
    n /= 2;
  }

  uint64_t sqrt_n = sqrt(n);
  for (uint64_t j = 3; j <= sqrt_n; j += 2) {
    while (n % j == 0) {
      factors[i++] = j;
      n /= j;
      sqrt_n = sqrt(n);
    }
  }

  if (n > 2) {
    factors[i++] = n;
  }

  return i;
}