#include "sieve.h"
#include <math.h>

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    uint32_t primes_idx;

    if (primes == NULL) return 0;
    if (limit >= ARRAY_LEN) return 0;
    if (limit < 2) return 0;

    // Initialize prime_array.  Start at 2.
    for (uint32_t idx = 2; idx <= limit; idx++) {
        prime_array[idx] = true;
    }

    primes_idx = 0;

    // Sieve of Eratosthenes optimization: only iterate up to the square root of the limit.
    uint32_t sqrt_limit = (uint32_t)sqrt(limit);

    for (uint32_t nb = 2; nb <= sqrt_limit; nb++) {
        if (prime_array[nb]) {
            // Optimization: Start marking multiples from nb*nb, as smaller multiples are already marked.
            for (uint32_t j = nb * nb; j <= limit; j += nb) {
                prime_array[j] = false;
            }
        }
    }

    // Collect the primes.
    for (uint32_t nb = 2; nb <= limit; nb++) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return primes_idx;
        }
    }

    return primes_idx;
}