#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    int new_items = 0;
    // First pass to calculate the total number of new items
    for (int i = 0; i < legacy_items; i++) {
        new_items += strlen(input[i].value);
    }

    // Allocate memory for the output array
    *output = (new_map *)malloc(sizeof(new_map) * new_items);
    if (*output == NULL) {
        return -1; // Handle memory allocation failure
    }

    new_items = 0; // Reset new_items for the second pass

    // Second pass to populate the output array
    for (int i = 0; i < legacy_items; i++) {
        char *value = input[i].value;
        int key = input[i].key;
        for (char *c = value; *c; c++) {
            (*output)[new_items].key = (*c - 'A') + 'a';
            (*output)[new_items].value = key;
            new_items++;
        }
    }
    return new_items;
}