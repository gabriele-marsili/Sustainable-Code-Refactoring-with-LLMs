#include "sieve.h"

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    if (primes == NULL || limit >= ARRAY_LEN) return 0;

    for (uint32_t i = 0; i <= limit; i++) {
        prime_array[i] = (i > 1);
    }

    uint32_t primes_idx = 0;
    for (uint32_t nb = 2; nb <= limit; nb++) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return primes_idx;

            for (uint32_t multiple = nb * nb; multiple <= limit; multiple += nb) {
                prime_array[multiple] = false;
            }
        }
    }
    return primes_idx;
}