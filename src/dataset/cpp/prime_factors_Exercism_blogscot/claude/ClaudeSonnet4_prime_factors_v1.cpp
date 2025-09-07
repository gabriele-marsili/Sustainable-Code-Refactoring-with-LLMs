#include "./prime_factors.h"

namespace prime_factors {
using std::vector;

vector<int> of(const int input) {
  if (input <= 1) return {};
  
  auto number = input;
  vector<int> primes{};
  primes.reserve(32); // Reserve space for typical case
  
  // Handle factor 2 separately
  while (number % 2 == 0) {
    primes.push_back(2);
    number >>= 1; // Divide by 2 using bit shift
  }
  
  // Check odd factors from 3 onwards
  for (int i = 3; i * i <= number; i += 2) {
    while (number % i == 0) {
      primes.push_back(i);
      number /= i;
    }
  }
  
  // If number is still > 1, it's a prime factor
  if (number > 1) {
    primes.push_back(number);
  }
  
  return primes;
}

}  // namespace prime_factors