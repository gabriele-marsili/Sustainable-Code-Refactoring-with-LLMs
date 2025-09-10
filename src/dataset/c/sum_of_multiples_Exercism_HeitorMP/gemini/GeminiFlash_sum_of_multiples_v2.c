#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit) {
  unsigned int result = 0;
  bool multiple[limit];

  if (number_of_factors == 1 && factors[0] == 0) {
    return result;
  }

  for (unsigned int i = 0; i < limit; ++i) {
    multiple[i] = false;
  }

  for (size_t i = 0; i < number_of_factors; ++i) {
    if (factors[i] == 0) continue;

    for (unsigned int j = factors[i]; j < limit; j += factors[i]) {
      multiple[j] = true;
    }
  }

  for (unsigned int i = 0; i < limit; ++i) {
    if (multiple[i]) {
      result += i;
    }
  }

  return result;
}