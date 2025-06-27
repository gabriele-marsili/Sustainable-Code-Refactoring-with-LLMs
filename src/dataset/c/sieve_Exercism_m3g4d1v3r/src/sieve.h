#ifndef SIEVE_H
#define SIEVE_H

#define ARRAY_LEN 2000
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

extern bool prime_array[ARRAY_LEN];
/// Calculate at most `max_primes` prime numbers in the interval [2,limit]
/// using the Sieve of Eratosthenes and store the prime numbers in `primes`
/// in increasing order.
/// The function returns the number of calculated primes.
uint32_t sieve(uint32_t limit, uint32_t *primes, size_t max_primes);

#endif
