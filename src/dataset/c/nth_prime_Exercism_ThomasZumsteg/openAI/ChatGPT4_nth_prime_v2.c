#include "nth_prime.h"
#include <math.h>
#include <stdlib.h>

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
    if (n == 1) return 2;

    uint32_t *primes = malloc(n * sizeof(uint32_t));
    if (!primes) return 0;

    primes[0] = 2;
    int count = 1;
    uint32_t candidate = 3;

    while (count < n) {
        if (is_prime(candidate, primes, count)) {
            primes[count++] = candidate;
        }
        candidate += 2;
    }

    uint32_t result = primes[n - 1];
    free(primes);
    return result;
}