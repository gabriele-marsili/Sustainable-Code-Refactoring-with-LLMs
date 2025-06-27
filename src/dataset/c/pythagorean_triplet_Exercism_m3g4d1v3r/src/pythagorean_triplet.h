#ifndef PYTHAGOREAN_TRIPLET_H
#define PYTHAGOREAN_TRIPLET_H

#define MAX_OUTPUT 100

#include <math.h>
#include <stdlib.h>

typedef struct {
    int a;
    int b;
    int c;
} triplet_t;

typedef struct {
    int count;
    triplet_t *triplets;
} triplets_t;

triplets_t *triplets_with_sum(int n);
void free_triplets(triplets_t *data);

#endif
