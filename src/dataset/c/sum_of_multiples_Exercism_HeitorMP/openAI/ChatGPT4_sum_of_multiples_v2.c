#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;

    if (number_of_factors == 1 && factors[0] == 0)
        return result;

    char is_multiple[limit];
    for (unsigned int i = 0; i < limit; i++)
        is_multiple[i] = 0;

    for (unsigned int j = 0; j < number_of_factors; j++)
    {
        if (factors[j] == 0)
            continue;

        for (unsigned int i = factors[j]; i < limit; i += factors[j])
        {
            if (!is_multiple[i])
            {
                result += i;
                is_multiple[i] = 1;
            }
        }
    }

    return result;
}