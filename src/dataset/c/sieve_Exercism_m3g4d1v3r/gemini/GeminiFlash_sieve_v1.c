#include "sieve.h"
#include <math.h>

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    if (primes == NULL || limit >= ARRAY_LEN) return 0;

    // Initialize prime_array using memset for efficiency
    memset(prime_array, true, sizeof(bool) * (limit + 1));
    prime_array[0] = false;
    prime_array[1] = false;

    uint32_t primes_idx = 0;
    uint32_t sqrt_limit = (uint32_t)sqrt(limit); // Calculate square root once

    for (uint32_t nb = 2; nb <= sqrt_limit; nb++) {
        if (prime_array[nb]) {
            // Optimization: Start marking multiples from nb*nb
            for (uint32_t j = nb * nb; j <= limit; j += nb) {
                prime_array[j] = false;
            }
        }
    }

    for (uint32_t nb = 2; nb <= limit; nb++) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return primes_idx;
        }
    }

    return primes_idx;
}