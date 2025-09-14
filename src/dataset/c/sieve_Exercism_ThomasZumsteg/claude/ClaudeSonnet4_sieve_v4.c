#include "sieve.h"
#include <stdlib.h>
#include <string.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;
    
    const unsigned int sieve_size = (limit + 1) / 2;
    char *sieve_odd = calloc(sieve_size, sizeof(char));
    unsigned int n_primes = 0;
    
    if (limit >= 2) {
        primes[n_primes++] = 2;
    }
    
    const unsigned int sqrt_limit = 1;
    unsigned int temp = limit;
    while (temp > 1) {
        temp >>= 2;
        sqrt_limit <<= 1;
    }
    
    for (unsigned int i = 3; i <= sqrt_limit; i += 2) {
        const unsigned int idx = i / 2;
        if (sieve_odd[idx] == 0) {
            const unsigned int step = i << 1;
            for (unsigned int p = i * i; p <= limit; p += step) {
                sieve_odd[p / 2] = 1;
            }
        }
    }
    
    for (unsigned int i = 3; i <= limit; i += 2) {
        if (sieve_odd[i / 2] == 0) {
            primes[n_primes++] = i;
        }
    }
    
    free(sieve_odd);
    return n_primes;
}