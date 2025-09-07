#include "./prime_factors.h"

namespace prime_factors {
using std::vector;

vector<int> of(const int input) {
  int number = input;
  vector<int> primes{};

  if (number <= 1) {
    return primes;
  }

  while (number % 2 == 0) {
    primes.push_back(2);
    number /= 2;
  }

  for (int i = 3; i * i <= number; i += 2) {
    while (number % i == 0) {
      primes.push_back(i);
      number /= i;
    }
  }

  if (number > 1) {
    primes.push_back(number);
  }

  return primes;
}

}  // namespace prime_factors