#ifndef NUCLEOTIDE_COUNT_H
#define NUCLEOTIDE_COUNT_H

#include <math.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct occurrence_map {
    size_t A;
    size_t C;
    size_t G;
    size_t T;
} occurrence_map_t;

size_t count_digits(size_t input);
char *count(const char *dna_strand);

#endif
