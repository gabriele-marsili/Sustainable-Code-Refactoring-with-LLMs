#include "./sieve.h"

#include <numeric>

namespace sieve {

using std::vector;

vector<int> const primes(int maxValue) {
  vector<int> result(maxValue, 0);
  std::iota(result.begin() + 2, result.end(), 2);

  for (int i = 2; i * i <= maxValue; i++) {
    for (int j = 2; j * i <= maxValue; j++) {
      result[j * i] = 0;
    }
  }

  result.erase(std::remove(result.begin(), result.end(), 0), result.end());
  return result;
}

}  // namespace sieve
