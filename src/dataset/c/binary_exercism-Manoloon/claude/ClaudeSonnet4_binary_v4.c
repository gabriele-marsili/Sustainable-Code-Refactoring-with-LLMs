#include "binary.h"
#include <stdlib.h>

int convert(const char *input) 
{ 
    if(input == NULL) return 0;
    
    const char *ptr = input;
    size_t result = 0;
    
    while(*ptr) {
        if(*ptr == '1') {
            result = (result << 1) | 1;
        } else if(*ptr == '0') {
            result <<= 1;
        } else {
            return INVALID;
        }
        ++ptr;
    }
    
    return (int)result; 
}