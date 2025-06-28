#include "./nth_prime.h"

#include <stdexcept>
#include <vector>

namespace prime {

using std::vector;

int nth(int number) {
  if (number < 1) {
    throw std::domain_error("nth: Invalid argument!");
  }
  vector<int> primes{2};
  int value{3};
  auto is_prime = false;

  while (primes.size() != number) {
    is_prime = true;
    for (auto& prime : primes) {
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
