#include "pangram.h"
#include <stdbool.h>
#include <ctype.h>

bool is_pangram(const char *sentence) 
{
    if (!sentence) return false;

    unsigned int alphabet_mask = 0;
    const unsigned int full_mask = (1 << 26) - 1;

    for (; *sentence; ++sentence) 
    {
        char c = tolower(*sentence);
        if (c >= 'a' && c <= 'z') 
        {
            alphabet_mask |= 1 << (c - 'a');
            if (alphabet_mask == full_mask) return true;
        }
    }

    return false;
}