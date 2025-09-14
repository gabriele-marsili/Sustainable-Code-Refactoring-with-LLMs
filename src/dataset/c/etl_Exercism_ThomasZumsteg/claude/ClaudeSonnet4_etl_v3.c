#include "etl.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert(legacy_map *input, int legacy_items, new_map **output) {
    if (!input || legacy_items <= 0) {
        *output = NULL;
        return 0;
    }
    
    int total_chars = 0;
    for(int i = 0; i < legacy_items; i++) {
        if (input[i].value) {
            total_chars += strlen(input[i].value);
        }
    }
    
    if (total_chars == 0) {
        *output = NULL;
        return 0;
    }
    
    *output = (new_map *)malloc(total_chars * sizeof(new_map));
    if (!*output) {
        return 0;
    }
    
    int new_items = 0;
    for(int i = 0; i < legacy_items; i++) {
        if (!input[i].value) continue;
        
        for(char *c = input[i].value; *c; c++) {
            (*output)[new_items].key = (*c >= 'A' && *c <= 'Z') ? (*c - 'A') + 'a' : *c;
            (*output)[new_items].value = input[i].key;
            new_items++;
        }
    }
    
    return new_items;
}