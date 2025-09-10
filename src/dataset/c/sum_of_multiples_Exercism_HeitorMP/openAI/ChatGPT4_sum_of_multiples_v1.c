#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;

    if (number_of_factors == 1 && factors[0] == 0)
        return result;

    unsigned char *is_multiple = (unsigned char *)calloc(limit, sizeof(unsigned char));
    if (!is_multiple)
        return result; // Handle memory allocation failure

    for (size_t j = 0; j < number_of_factors; j++)
    {
        unsigned int factor = factors[j];
        if (factor == 0)
            continue;

        for (unsigned int i = factor; i < limit; i += factor)
        {
            if (!is_multiple[i])
            {
                is_multiple[i] = 1;
                result += i;
            }
        }
    }

    free(is_multiple);
    return result;
}