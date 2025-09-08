#include "isogram.h"
#include <stdint.h>

bool is_isogram(const char phrase[])
{
    if (phrase == NULL)
        return false;
    
    uint32_t seen = 0;
    
    for (const char *p = phrase; *p; p++)
    {
        if ((*p >= 'A' && *p <= 'Z') || (*p >= 'a' && *p <= 'z'))
        {
            int bit_pos = (*p | 32) - 'a';
            uint32_t mask = 1U << bit_pos;
            if (seen & mask)
                return false;
            seen |= mask;
        }
    }
    return true;
}