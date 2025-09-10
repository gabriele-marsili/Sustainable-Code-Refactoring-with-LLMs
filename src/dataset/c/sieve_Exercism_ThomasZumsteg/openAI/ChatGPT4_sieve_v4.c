#include "sieve.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;

    unsigned int n_primes = 0;
    size_t sieve_size = (limit + 1) / 2;
    char *sieve = calloc(sieve_size, sizeof(char));

    primes[n_primes++] = 2;

    unsigned int sqrt_limit = (unsigned int)sqrt(limit);
    for (unsigned int i = 1; i < sieve_size; i++) {
        if (!sieve[i]) {
            unsigned int prime = 2 * i + 1;
            primes[n_primes++] = prime;

            if (prime <= sqrt_limit) {
                for (unsigned int j = (prime * prime) / 2; j < sieve_size; j += prime)
                    sieve[j] = 1;
            }
        }
    }

    free(sieve);
    return n_primes;
}