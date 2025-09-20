#include "./nth_prime.h"

#include <stdexcept>
#include <vector>
#include <cmath>

namespace prime {

using std::vector;

int nth(int number) {
  if (number < 1) {
    throw std::domain_error("nth: Invalid argument!");
  }
  vector<int> primes;
  primes.reserve(number);  // Reserve memory upfront to avoid reallocations
  primes.push_back(2);
  int value = 3;

  while (primes.size() < number) {
    bool is_prime = true;
    int limit = static_cast<int>(std::sqrt(value));
    for (const auto& prime : primes) {
      if (prime > limit) break;  // Only check up to the square root of the value
      if (value % prime == 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      primes.push_back(value);
    }
    value += 2;  // Skip even numbers
  }
  return primes.back();
}

}  // namespace prime