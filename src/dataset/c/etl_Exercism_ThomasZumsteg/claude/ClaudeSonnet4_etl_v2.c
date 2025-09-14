#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    // Count total items needed to allocate memory once
    int total_chars = 0;
    for(int i = 0; i < legacy_items; i++) {
        total_chars += strlen(input[i].value);
    }
    
    // Single memory allocation
    *output = (new_map *)malloc(total_chars * sizeof(new_map));
    
    int new_items = 0;
    for(int i = 0; i < legacy_items; i++) {
        char *value = input[i].value;
        int key = input[i].key;
        
        // Process string without pointer arithmetic in loop condition
        for(int j = 0; value[j] != '\0'; j++) {
            (*output)[new_items].key = (value[j] - 'A') + 'a';
            (*output)[new_items].value = key;
            new_items++;
        }
    }
    
    return new_items;
}