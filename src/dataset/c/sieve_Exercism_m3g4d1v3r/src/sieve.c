#include "sieve.h"

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    uint32_t primes_idx, j;

    prime_array[0] = false;
    prime_array[1] = true;
    if (primes == NULL) return (0);
    if (limit >= ARRAY_LEN) return (0);
    for (uint32_t idx = 2; idx <= limit; idx++) {
        prime_array[idx] = true;
    }
    primes_idx = 0;
    for (uint32_t nb = 2; nb <= limit; nb++) {
        if (prime_array[nb] == true) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return (primes_idx);
            j = 2;
            while ((nb * j) <= limit) {
                prime_array[nb * j++] = false;
            }
        }
    }
    return (primes_idx);
}
