#include "binary.h"
#include <stdlib.h>

int convert(const char *input) 
{ 
    if (!input) return 0;

    int result = 0;
    for (const char *ptr = input; *ptr; ++ptr) 
    {
        if (*ptr == '1') 
        {
            result = (result << 1) | 1;
        } 
        else if (*ptr == '0') 
        {
            result <<= 1;
        } 
        else 
        {
            return INVALID;
        }
    }
    return result;
}