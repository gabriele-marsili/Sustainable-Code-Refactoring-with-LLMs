#include "isogram.h"
#include <string.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if (!phrase) return false;
    unsigned int marked = 0;
    for (size_t i = 0; phrase[i] != '\0'; ++i)
    {
        char item = tolower(phrase[i]);
        if (item >= 'a' && item <= 'z')
        {
            unsigned int mask = 1u << (item - 'a');
            if (marked & mask) return false;
            marked |= mask;
        }
    }
    return true;
}