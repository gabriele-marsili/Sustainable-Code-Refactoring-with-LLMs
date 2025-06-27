#ifndef ETL_H
#define ETL_H

#define ALPHABET_SIZE ('z' - 'a' + 1)

#include <stddef.h>
#include <stdlib.h>

typedef struct {
    int value;
    const char *keys;
} legacy_map;

typedef struct {
    char key;
    int value;
} new_map;

extern size_t auxiliar_array[ALPHABET_SIZE];
void empty_auxiliar_array();
int convert(const legacy_map *input, const size_t input_len, new_map **output);

#endif
