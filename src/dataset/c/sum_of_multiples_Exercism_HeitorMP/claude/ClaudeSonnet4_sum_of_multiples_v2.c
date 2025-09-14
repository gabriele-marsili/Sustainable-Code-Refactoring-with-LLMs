#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;
    
    if (number_of_factors == 0 || limit <= 1)
        return result;
    
    // Check for zero factors and count valid ones
    size_t valid_factors = 0;
    for (size_t i = 0; i < number_of_factors; i++) {
        if (factors[i] == 0)
            return result;
        if (factors[i] < limit)
            valid_factors++;
    }
    
    if (valid_factors == 0)
        return result;
    
    // Use bit array to mark multiples (more memory efficient than hash set for small ranges)
    unsigned char *is_multiple = calloc((limit + 7) / 8, sizeof(unsigned char));
    if (!is_multiple)
        return result;
    
    // Mark multiples for each factor
    for (size_t j = 0; j < number_of_factors; j++) {
        if (factors[j] >= limit)
            continue;
            
        for (unsigned int multiple = factors[j]; multiple < limit; multiple += factors[j]) {
            size_t byte_idx = multiple / 8;
            size_t bit_idx = multiple % 8;
            if (!(is_multiple[byte_idx] & (1 << bit_idx))) {
                is_multiple[byte_idx] |= (1 << bit_idx);
                result += multiple;
            }
        }
    }
    
    free(is_multiple);
    return result;
}