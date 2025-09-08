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
            c |= 0x20; // Convert to lowercase
            int bit_pos = c - 'a';
            uint32_t mask = 1U << bit_pos;
            if (seen & mask)
                return false;
            seen |= mask;
        }
    }
    return true;
}