#include "binary.h"
#include <stdlib.h>

int convert(const char *input) 
{ 
    if (!input) return 0;

    int result = 0;
    for (const char *p = input; *p; ++p) 
    {
        if (*p == '1') 
        {
            result = (result << 1) | 1;
        } 
        else if (*p == '0') 
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