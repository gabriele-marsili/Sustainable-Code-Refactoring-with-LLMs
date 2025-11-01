#include "isogram.h"
#include <stdint.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if(phrase == NULL) return false;
    
    uint32_t seen = 0;
    
    for(const char *p = phrase; *p; ++p)
    {
        if(*p >= 'A' && *p <= 'Z')
        {
            uint32_t bit = 1U << (*p - 'A');
            if(seen & bit) return false;
            seen |= bit;
        }
        else if(*p >= 'a' && *p <= 'z')
        {
            uint32_t bit = 1U << (*p - 'a');
            if(seen & bit) return false;
            seen |= bit;
        }
    }
    
    return true;
}