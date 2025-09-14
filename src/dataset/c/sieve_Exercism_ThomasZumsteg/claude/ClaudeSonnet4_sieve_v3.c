#include "sieve.h"
#include <stdlib.h>
#include <string.h>

unsigned int sieve(const unsigned int limit, primesArray_t primes) {
    if (limit < 2) return 0;
    
    const unsigned int sieve_size = (limit + 1) / 8 + 1;
    unsigned char *sieve = calloc(sieve_size, sizeof(unsigned char));
    if (!sieve) return 0;
    
    unsigned int n_primes = 0;
    
    if (limit >= 2) {
        primes[n_primes++] = 2;
    }
    
    const unsigned int sqrt_limit = 1;
    unsigned int temp = limit;
    while (temp > 1) {
        temp >>= 2;
        sqrt_limit++;
    }
    const unsigned int actual_sqrt = sqrt_limit * sqrt_limit > limit ? sqrt_limit - 1 : sqrt_limit;
    
    for (unsigned int i = 3; i <= limit; i += 2) {
        const unsigned int byte_idx = i >> 3;
        const unsigned int bit_idx = i & 7;
        
        if (!(sieve[byte_idx] & (1 << bit_idx))) {
            primes[n_primes++] = i;
            
            if (i <= actual_sqrt) {
                for (unsigned int p = i * i; p <= limit; p += i << 1) {
                    const unsigned int p_byte_idx = p >> 3;
                    const unsigned int p_bit_idx = p & 7;
                    sieve[p_byte_idx] |= (1 << p_bit_idx);
                }
            }
        }
    }
    
    free(sieve);
    return n_primes;
}