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

  vector<int> primes;
  primes.reserve(number);
  primes.push_back(2);

  int candidate = 3;
  while (primes.size() < number) {
    bool is_prime = true;
    int sqrt_candidate = std::sqrt(candidate);
    for (int prime : primes) {
      if (prime > sqrt_candidate) {
        break;
      }
      if (candidate % prime == 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      primes.push_back(candidate);
    }
    candidate += 2;
  }
  return primes.back();
}

}  // namespace prime