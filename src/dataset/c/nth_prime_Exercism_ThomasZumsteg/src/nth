#include "nth_prime.h"
#include <stdlib.h>
#include <math.h>

int n_primes;

int is_prime(uint32_t num, uint32_t primes[], int count) {
    uint32_t limit = (uint32_t)sqrt(num);
    for (int i = 0; i < count && primes[i] <= limit; i++) {
        if (num % primes[i] == 0)
            return 0;
    }
    return 1;
}

uint32_t nth(int n) {
    if (n <= 0) return 0;
    uint32_t *primes = malloc(n * sizeof(uint32_t));
    if (!primes) return 0;

    primes[0] = 2;
    n_primes = 1;

    for (uint32_t p = 3; n_primes < n; p += 2) {
        if (is_prime(p, primes, n_primes))
            primes[n_primes++] = p;
    }

    uint32_t result = primes[n - 1];
    free(primes);
    return result;
}