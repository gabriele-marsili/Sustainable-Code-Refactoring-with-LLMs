#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    if (number_of_factors == 0 || limit <= 1)
        return 0;
    
    unsigned int valid_factors[number_of_factors];
    size_t valid_count = 0;
    
    for (size_t i = 0; i < number_of_factors; i++) {
        if (factors[i] > 0 && factors[i] < limit) {
            valid_factors[valid_count++] = factors[i];
        }
    }
    
    if (valid_count == 0)
        return 0;
    
    unsigned int result = 0;
    unsigned char *is_multiple = calloc(limit, sizeof(unsigned char));
    
    for (size_t i = 0; i < valid_count; i++) {
        unsigned int factor = valid_factors[i];
        for (unsigned int multiple = factor; multiple < limit; multiple += factor) {
            if (!is_multiple[multiple]) {
                is_multiple[multiple] = 1;
                result += multiple;
            }
        }
    }
    
    free(is_multiple);
    return result;
}