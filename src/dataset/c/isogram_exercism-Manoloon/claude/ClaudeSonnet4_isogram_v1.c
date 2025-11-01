#include "isogram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if(phrase == NULL) return false;
    
    unsigned int seen = 0;
    
    for(const char *p = phrase; *p; ++p)
    {
        if(*p >= 'A' && *p <= 'Z')
        {
            unsigned int bit = 1U << (*p - 'A');
            if(seen & bit) return false;
            seen |= bit;
        }
        else if(*p >= 'a' && *p <= 'z')
        {
            unsigned int bit = 1U << (*p - 'a');
            if(seen & bit) return false;
            seen |= bit;
        }
    }
    
    return true;
}