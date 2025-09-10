#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    int total_chars = 0;

    // Calculate total number of characters to allocate memory once
    for (int i = 0; i < legacy_items; i++) {
        for (char *c = input[i].value; *c; c++) {
            total_chars++;
        }
    }

    *output = (new_map *)malloc(total_chars * sizeof(new_map));
    if (!*output) {
        return 0; // Return 0 if memory allocation fails
    }

    int new_items = 0;
    for (int i = 0; i < legacy_items; i++) {
        for (char *c = input[i].value; *c; c++) {
            (*output)[new_items].key = tolower(*c);
            (*output)[new_items].value = input[i].key;
            new_items++;
        }
    }

    return new_items;
}