#include "sieve.h"

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    if (primes == NULL || limit >= ARRAY_LEN || limit < 2) return 0;
    
    uint32_t primes_idx = 0;
    
    prime_array[0] = prime_array[1] = false;
    for (uint32_t idx = 2; idx <= limit; idx++) {
        prime_array[idx] = true;
    }
    
    for (uint32_t nb = 2; nb * nb <= limit; nb++) {
        if (prime_array[nb]) {
            for (uint32_t multiple = nb * nb; multiple <= limit; multiple += nb) {
                prime_array[multiple] = false;
            }
        }
    }
    
    for (uint32_t nb = 2; nb <= limit && primes_idx < max_primes; nb++) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
        }
    }
    
    return primes_idx;
}