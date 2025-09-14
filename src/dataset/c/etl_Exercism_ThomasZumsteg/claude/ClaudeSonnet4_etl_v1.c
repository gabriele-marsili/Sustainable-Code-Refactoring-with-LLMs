#include "etl.h"
#include <stdio.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    // Count total items needed to allocate memory once
    int total_items = 0;
    for(int i = 0; i < legacy_items; i++) {
        total_items += strlen(input[i].value);
    }
    
    // Allocate all memory at once
    *output = (new_map *)malloc(total_items * sizeof(new_map));
    if (!*output) return 0;
    
    int new_items = 0;
    for(int i = 0; i < legacy_items; i++) {
        char *value = input[i].value;
        int key = input[i].key;
        
        for(char *c = value; *c; c++) {
            (*output)[new_items].key = (*c - 'A') + 'a';
            (*output)[new_items].value = key;
            new_items++;
        }
    }
    
    return new_items;
}