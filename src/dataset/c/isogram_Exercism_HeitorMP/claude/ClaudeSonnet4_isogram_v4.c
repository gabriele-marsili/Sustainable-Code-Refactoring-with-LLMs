#include "isogram.h"
#include <stdint.h>

bool is_isogram(const char phrase[])
{
    if (phrase == NULL)
        return false;
    
    uint32_t seen = 0;
    
    for (const char *p = phrase; *p; ++p)
    {
        unsigned char c = *p;
        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))
        {
            c |= 0x20;
            uint32_t bit = 1U << (c - 'a');
            if (seen & bit)
                return false;
            seen |= bit;
        }
    }
    return true;
}