#include "prime_factors.h"

#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
  int i = 0;

  while (n % 2 == 0) {
    n = n / 2;
    factors[i] = 2;
    i++;
  }

  for (uint64_t j = 3; j <= n; j += 2) {
    while (n % j == 0) {
      n = n / j;
      factors[i] = j;
      i++;
    }
  }

  return i;
}
