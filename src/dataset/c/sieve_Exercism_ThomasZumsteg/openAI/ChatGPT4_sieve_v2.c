#include "sieve.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;

    char *sieve = calloc(limit + 1, sizeof(char));
    unsigned int n_primes = 0;
    unsigned int sqrt_limit = (unsigned int)sqrt(limit);

    for (unsigned int i = 2; i <= sqrt_limit; i++) {
        if (!sieve[i]) {
            primes[n_primes++] = i;
            for (unsigned int p = i * i; p <= limit; p += i)
                sieve[p] = 1;
        }
    }

    for (unsigned int i = sqrt_limit + 1; i <= limit; i++) {
        if (!sieve[i]) {
            primes[n_primes++] = i;
        }
    }

    free(sieve);
    return n_primes;
}