#include "binary.h"
#include <stdlib.h>

int convert(const char *input) 
{ 
    if (!input) return 0;

    int result = 0;
    for (size_t i = 0; input[i] != '\0'; ++i) 
    {   
        if (input[i] == '1') 
        {
            result = (result << 1) | 1;
        } 
        else if (input[i] == '0') 
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