
#include "./prime_factors.h"

namespace prime_factors {
using std::vector;

vector<int> of(const int input) {
  auto number = input;
  vector<int> primes{};
  int i = 2;

  while (number > 1) {
    if (number % i == 0) {
      primes.push_back(i);
      number /= i;
    } else {
      ++i;
    }
  }
  return primes;
}

}  // namespace prime_factors
