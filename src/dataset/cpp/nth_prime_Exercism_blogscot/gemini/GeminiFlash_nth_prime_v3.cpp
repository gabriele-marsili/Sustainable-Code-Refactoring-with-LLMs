#include "./nth_prime.h"

#include <cmath>
#include <stdexcept>
#include <vector>

namespace prime {

using std::vector;

int nth(int number) {
  if (number < 1) {
    throw std::domain_error("nth: Invalid argument!");
  }

  if (number == 1) return 2;

  vector<int> primes{2};
  int value{3};

  while (primes.size() < number) {
    bool is_prime = true;
    int sqrt_value = static_cast<int>(std::sqrt(value));
    for (const int& prime : primes) {
      if (prime > sqrt_value) {
        break;
      }
      if (value % prime == 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      primes.push_back(value);
    }
    value += 2;
  }
  return primes.back();
}

}  // namespace prime