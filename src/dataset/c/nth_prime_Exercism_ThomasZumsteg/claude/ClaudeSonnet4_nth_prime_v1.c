#include "nth_prime.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/queue.h>

int n_primes;

int prime(uint32_t num, uint32_t primes[]) {
    for(uint32_t *n = primes; *n * *n <= num; n++) {
        if(num % *n == 0)
            return 0;
    }
    return 1;
}

uint32_t nth(int n) {
    if(n <= 0) return 0;
    if(n == 1) return 2;
    if(n == 2) return 3;
    
    uint32_t *primes = malloc(n * sizeof(uint32_t));
    primes[0] = 2;
    primes[1] = 3;
    n_primes = 2;
    
    for(uint32_t p = 5; n_primes < n; p += 2) {
        int is_prime = 1;
        for(int i = 1; i < n_primes && primes[i] * primes[i] <= p; i++) {
            if(p % primes[i] == 0) {
                is_prime = 0;
                break;
            }
        }
        if(is_prime) {
            primes[n_primes++] = p;
        }
    }
    
    uint32_t result = primes[n-1];
    free(primes);
    return result;
}