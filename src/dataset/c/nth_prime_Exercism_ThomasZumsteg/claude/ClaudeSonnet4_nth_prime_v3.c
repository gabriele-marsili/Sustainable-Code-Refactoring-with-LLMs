#include "nth_prime.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/queue.h>

int n_primes;

static inline int prime(uint32_t num, uint32_t primes[], int count) {
    for(int i = 0; i < count && primes[i] * primes[i] <= num; i++) {
        if(num % primes[i] == 0)
            return 0;
    }
    return 1;
}

uint32_t nth(int n) {
    if(n <= 0) return 0;
    if(n == 1) return 2;
    if(n == 2) return 3;
    
    uint32_t *primes = malloc(n * sizeof(uint32_t));
    if(!primes) return 0;
    
    primes[0] = 2;
    primes[1] = 3;
    n_primes = 2;
    
    uint32_t candidate = 5;
    while(n_primes < n) {
        if(prime(candidate, primes, n_primes)) {
            primes[n_primes++] = candidate;
        }
        candidate += 2;
    }
    
    uint32_t result = primes[n-1];
    free(primes);
    return result;
}