#include "./prime_factors.h"

#include <cmath>

namespace prime_factors {
using std::vector;

vector<int> of(int number) {
  vector<int> primes;

  if (number <= 1) {
    return primes;
  }

  while (number % 2 == 0) {
    primes.push_back(2);
    number /= 2;
  }

  for (int i = 3; i <= std::sqrt(number); i += 2) {
    while (number % i == 0) {
      primes.push_back(i);
      number /= i;
    }
  }

  if (number > 2) {
    primes.push_back(number);
  }

  return primes;
}

}  // namespace prime_factors