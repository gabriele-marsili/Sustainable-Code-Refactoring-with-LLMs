#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    int new_items = 0;
    // Calculate the total number of new items to allocate memory only once
    for (int i = 0; i < legacy_items; i++) {
        new_items += strlen(input[i].value);
    }

    *output = (new_map *)malloc(sizeof(new_map) * new_items);
    if (*output == NULL) {
        return 0; // Handle memory allocation failure
    }

    new_items = 0; // Reset new_items to use as index
    for (int i = 0; i < legacy_items; i++) {
        char *c = input[i].value;
        int key_value = input[i].key;
        while (*c) {
            (*output)[new_items].key = (*c - 'A') + 'a';
            (*output)[new_items].value = key_value;
            new_items++;
            c++;
        }
    }
    return new_items;
}