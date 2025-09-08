#include "nth_prime.h"
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

uint32_t nth(int n) {
    if (n <= 0) return 0;

    if (n == 1) return 2;
    if (n == 2) return 3;

    uint32_t *primes = (uint32_t*)malloc(n * sizeof(uint32_t));
    if (!primes) return 0;

    primes[0] = 2;
    primes[1] = 3;
    int n_primes = 2;

    uint32_t candidate = 5;
    while (n_primes < n) {
        bool is_prime = true;
        for (int i = 1; i < n_primes && primes[i] * primes[i] <= candidate; ++i) {
            if (candidate % primes[i] == 0) {
                is_prime = false;
                break;
            }
        }
        if (is_prime) {
            primes[n_primes++] = candidate;
        }
        candidate += 2;
    }

    uint32_t result = primes[n - 1];
    free(primes);
    return result;
}