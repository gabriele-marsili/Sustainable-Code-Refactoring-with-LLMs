#ifndef NTH_PRIME_H
#define NTH_PRIME_H

#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

#define MAX_ARRAY 500000
extern bool sieve_array[MAX_ARRAY];
uint32_t nth(uint32_t n);

#endif
