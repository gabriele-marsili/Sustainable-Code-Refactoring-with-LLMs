#include "sieve.h"
#include <stdlib.h>
#include <string.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;
    
    char *sieve_array = malloc((limit + 1) / 2);
    memset(sieve_array, 0, (limit + 1) / 2);
    
    unsigned int n_primes = 0;
    
    if (limit >= 2) {
        primes[n_primes++] = 2;
    }
    
    for (unsigned int i = 3; i <= limit; i += 2) {
        unsigned int idx = i / 2;
        if (sieve_array[idx] == 0) {
            primes[n_primes++] = i;
            if (i <= limit / i) {
                for (unsigned int p = i * i; p <= limit; p += 2 * i) {
                    sieve_array[p / 2] = 1;
                }
            }
        }
    }
    
    free(sieve_array);
    return n_primes;
}