#include "sum_of_multiples.h"

unsigned int sum(const unsigned int *factors, const size_t number_of_factors,
                 const unsigned int limit)
{
    unsigned int result = 0;
    
    if (number_of_factors == 0 || limit <= 1)
        return result;
    
    // Filter out zero factors and duplicates
    unsigned int valid_factors[number_of_factors];
    size_t valid_count = 0;
    
    for (size_t i = 0; i < number_of_factors; i++) {
        if (factors[i] == 0 || factors[i] >= limit)
            continue;
            
        // Check for duplicates
        bool duplicate = false;
        for (size_t j = 0; j < valid_count; j++) {
            if (valid_factors[j] == factors[i]) {
                duplicate = true;
                break;
            }
        }
        
        if (!duplicate) {
            valid_factors[valid_count++] = factors[i];
        }
    }
    
    if (valid_count == 0)
        return result;
    
    // Use a boolean array to mark multiples
    bool is_multiple[limit];
    for (unsigned int i = 0; i < limit; i++) {
        is_multiple[i] = false;
    }
    
    // Mark multiples for each valid factor
    for (size_t j = 0; j < valid_count; j++) {
        unsigned int factor = valid_factors[j];
        for (unsigned int multiple = factor; multiple < limit; multiple += factor) {
            is_multiple[multiple] = true;
        }
    }
    
    // Sum all marked multiples
    for (unsigned int i = 1; i < limit; i++) {
        if (is_multiple[i]) {
            result += i;
        }
    }
    
    return result;
}