#include "./prime_factors.h"

namespace prime_factors {
using std::vector;

vector<int> of(const int input) {
  if (input <= 1) return {};
  
  vector<int> primes;
  primes.reserve(32);
  
  auto number = input;
  
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
  
  if (number > 2) {
    primes.push_back(number);
  }
  
  return primes;
}

}  // namespace prime_factors