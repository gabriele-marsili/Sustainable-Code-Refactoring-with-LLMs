#include "binary.h"

int convert(const char *input)
{
    int res = 0;
    int len = (int)strlen(input);
    
    for(int j = 0; j < len; j++)
    {
        char c = input[j];
        if (c != '0' && c != '1')
        {
            return INVALID;
        }
        
        res <<= 1;
        if(c == '1')
        {
            res |= 1;
        }
    }
    
    return res;
}