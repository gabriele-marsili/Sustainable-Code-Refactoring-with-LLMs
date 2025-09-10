#include "sieve.h"
#include <stdlib.h>
#include <string.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;

    unsigned int n_primes = 0;
    char *sieve = calloc((limit + 1) / 2, sizeof(char));
    primes[n_primes++] = 2;

    for (unsigned int i = 3; i <= limit; i += 2) {
        if (!sieve[i / 2]) {
            primes[n_primes++] = i;
            if ((unsigned long long)i * i <= limit) {
                for (unsigned int p = i * i; p <= limit; p += 2 * i)
                    sieve[p / 2] = 1;
            }
        }
    }

    free(sieve);
    return n_primes;
}