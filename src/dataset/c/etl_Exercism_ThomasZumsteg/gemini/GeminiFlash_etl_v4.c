#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    int new_items = 0;
    int total_new_items = 0;

    for (int i = 0; i < legacy_items; i++) {
        total_new_items += strlen(input[i].value);
    }

    *output = (new_map *)malloc(sizeof(new_map) * total_new_items);
    if (*output == NULL) {
        return 0; // Handle allocation failure
    }

    new_map *current_output = *output;

    for (int i = 0; i < legacy_items; i++) {
        for (char *c = input[i].value; *c; c++) {
            current_output->key = (*c - 'A') + 'a';
            current_output->value = input[i].key;
            current_output++;
            new_items++;
        }
    }

    return new_items;
}