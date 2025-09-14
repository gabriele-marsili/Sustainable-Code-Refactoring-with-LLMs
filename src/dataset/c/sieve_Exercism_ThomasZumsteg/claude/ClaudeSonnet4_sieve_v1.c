#include "sieve.h"
#include <stdlib.h>
#include <string.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;
    
    char *sieve_array = calloc((limit + 1) / 2, sizeof(char));
    unsigned int n_primes = 0;
    
    // Handle 2 separately
    primes[n_primes++] = 2;
    
    // Only check odd numbers
    for (unsigned int i = 3; i <= limit; i += 2) {
        unsigned int idx = i / 2;
        if (sieve_array[idx] == 0) {
            primes[n_primes++] = i;
            // Start from i*i and mark only odd multiples
            for (unsigned int p = i * i; p <= limit; p += 2 * i) {
                sieve_array[p / 2] = 1;
            }
        }
    }
    
    free(sieve_array);
    return n_primes;
}