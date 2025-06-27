#include "nth_prime.h"

bool sieve_array[MAX_ARRAY];

uint32_t nth(uint32_t n) {
    uint32_t five_first_primes[] = {2, 3, 5, 7, 11};
    uint32_t upper_limit;

    if (n == 0) return (0);
    if (n > 0 && n <= 5) return five_first_primes[n - 1];
    sieve_array[0] = false;
    sieve_array[1] = false;
    for (size_t nb = 2; nb < MAX_ARRAY; nb++) {
        sieve_array[nb] = true;
    }
    upper_limit = n * log(n) + n * (log(log(n)));
    for (size_t nb = 2; nb < upper_limit; nb++) {
        for (size_t mult = 2; (nb * mult) < upper_limit; mult++) {
            sieve_array[nb * mult] = false;
        }
    }
    for (size_t nb = 2; nb < upper_limit; nb++) {
        if (sieve_array[nb] == true) {
            if (--n == 0) {
                return (nb);
            }
        }
    }
    return (0);
}
