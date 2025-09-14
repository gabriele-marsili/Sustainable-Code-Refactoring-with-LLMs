#include "sieve.h"

bool prime_array[ARRAY_LEN];

uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes) {
    if (primes == NULL || limit >= ARRAY_LEN || limit < 2) return 0;
    
    uint32_t primes_idx = 0;
    
    // Initialize array more efficiently
    prime_array[0] = prime_array[1] = false;
    for (uint32_t idx = 2; idx <= limit; idx++) {
        prime_array[idx] = true;
    }
    
    // Handle 2 separately to allow skipping even numbers
    if (limit >= 2) {
        primes[primes_idx++] = 2;
        if (primes_idx == max_primes) return primes_idx;
        
        // Mark all even numbers as composite
        for (uint32_t j = 4; j <= limit; j += 2) {
            prime_array[j] = false;
        }
    }
    
    // Only check odd numbers starting from 3
    for (uint32_t nb = 3; nb <= limit; nb += 2) {
        if (prime_array[nb]) {
            primes[primes_idx++] = nb;
            if (primes_idx == max_primes) return primes_idx;
            
            // Start marking from nb*nb and skip even multiples
            uint64_t start = (uint64_t)nb * nb;
            if (start > limit) continue;
            
            for (uint64_t multiple = start; multiple <= limit; multiple += 2 * nb) {
                prime_array[multiple] = false;
            }
        }
    }
    
    return primes_idx;
}