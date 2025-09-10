#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;
    bool multiples[limit];

    if (number_of_factors == 1 && factors[0] == 0)
        return result;

    for (unsigned int i = 0; i < limit; ++i) {
        multiples[i] = false;
    }

    for (size_t i = 0; i < number_of_factors; ++i) {
        if (factors[i] == 0) continue;

        for (unsigned int j = factors[i]; j < limit; j += factors[i]) {
            multiples[j] = true;
        }
    }

    for (unsigned int i = 0; i < limit; ++i) {
        if (multiples[i]) {
            result += i;
        }
    }

    return result;
}