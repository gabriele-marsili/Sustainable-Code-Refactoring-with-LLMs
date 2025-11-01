#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if (!phrase) return false;
    unsigned int marked = 0;
    for (const char *p = phrase; *p; ++p)
    {
        char item = tolower(*p);
        if (item >= 'a' && item <= 'z')
        {
            unsigned int bit = 1u << (item - 'a');
            if (marked & bit) return false;
            marked |= bit;
        }
    }
    return true;
}