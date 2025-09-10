#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;
    char *is_multiple = (char *)calloc(limit, sizeof(char));

    if (!is_multiple)
        return 0;

    for (size_t j = 0; j < number_of_factors; j++)
    {
        unsigned int factor = factors[j];
        if (factor == 0)
            continue;

        for (unsigned int i = factor; i < limit; i += factor)
        {
            if (!is_multiple[i])
            {
                result += i;
                is_multiple[i] = 1;
            }
        }
    }

    free(is_multiple);
    return result;
}