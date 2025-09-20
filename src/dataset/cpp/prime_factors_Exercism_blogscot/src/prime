#include "./prime_factors.h"

namespace prime_factors {
using std::vector;

vector<int> of(const int input) {
  auto number = input;
  vector<int> primes{};
  
  for (int i = 2; i * i <= number; ++i) {
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