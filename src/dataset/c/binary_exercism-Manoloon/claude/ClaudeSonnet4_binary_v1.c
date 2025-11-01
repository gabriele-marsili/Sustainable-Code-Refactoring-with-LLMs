#include "binary.h"
#include <stdlib.h>

int convert(const char *input) 
{ 
    if(input == NULL) return 0;
    
    const char *ptr = input;
    int result = 0;
    
    // First pass: validate and calculate length
    while(*ptr) {
        if(*ptr != '0' && *ptr != '1') {
            return INVALID;
        }
        ptr++;
    }
    
    // Second pass: convert
    ptr = input;
    while(*ptr) {
        result = (result << 1) + (*ptr - '0');
        ptr++;
    }
    
    return result;
}