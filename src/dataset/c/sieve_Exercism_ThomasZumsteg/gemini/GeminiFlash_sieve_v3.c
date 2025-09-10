#include "sieve.h"
#include <stdlib.h>
#include <math.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;

    char *sieve = calloc(limit / 8 + 1, sizeof(char));
    unsigned int n_primes = 0;
    unsigned int sqrt_limit = (unsigned int)sqrt(limit);

    primes[n_primes++] = 2;

    for (unsigned int i = 3; i <= sqrt_limit; i += 2) {
        if ((sieve[i / 8] & (1 << (i % 8))) == 0) {
            for (unsigned int p = i * i; p <= limit; p += 2 * i) {
                sieve[p / 8] |= (1 << (p % 8));
            }
        }
    }

    for (unsigned int i = 3; i <= limit; i += 2) {
        if ((sieve[i / 8] & (1 << (i % 8))) == 0) {
            primes[n_primes++] = i;
        }
    }

    free(sieve);
    return n_primes;
}