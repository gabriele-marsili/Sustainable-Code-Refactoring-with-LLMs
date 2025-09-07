#include "prime_factors.h"
#include <vector>
#include <cmath>

namespace prime_factors {

std::vector<int> of(int n) {
  std::vector<int> factors;

  if (n <= 1) {
    return factors;
  }

  while (n % 2 == 0) {
    factors.push_back(2);
    n /= 2;
  }

  for (int i = 3; i <= std::sqrt(n); i += 2) {
    while (n % i == 0) {
      factors.push_back(i);
      n /= i;
    }
  }

  if (n > 2) {
    factors.push_back(n);
  }

  return factors;
}

}  // namespace prime_factors