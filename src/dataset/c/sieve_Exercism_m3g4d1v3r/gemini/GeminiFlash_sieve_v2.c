#include "sieve.h"
#include <math.h>

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    uint32_t primes_idx = 0;

    if (primes == NULL || limit >= ARRAY_LEN) return 0;

    // Initialize prime_array.  Start from 2. Index 0 and 1 are not used.
    for (uint32_t idx = 2; idx <= limit; idx++) {
        prime_array[idx] = true;
    }

    // Sieve of Eratosthenes
    uint32_t sqrt_limit = (uint32_t)sqrt(limit);
    for (uint32_t nb = 2; nb <= sqrt_limit; nb++) {
        if (prime_array[nb]) {
            // Start marking multiples from nb*nb, as smaller multiples would have already been marked.
            for (uint32_t multiple = nb * nb; multiple <= limit; multiple += nb) {
                prime_array[multiple] = false;
            }
        }
    }

    // Collect primes
    for (uint32_t nb = 2; nb <= limit; nb++) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return primes_idx;
        }
    }

    return primes_idx;
}