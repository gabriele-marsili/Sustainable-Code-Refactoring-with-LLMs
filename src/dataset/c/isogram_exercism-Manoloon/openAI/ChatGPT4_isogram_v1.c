#include "isogram.h"
#include <string.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if (!phrase) return false;
    int marked = 0;
    for (size_t i = 0; phrase[i] != '\0'; ++i)
    {
        char item = tolower(phrase[i]);
        if (item >= 'a' && item <= 'z')
        {
            int bit = 1 << (item - 'a');
            if (marked & bit) return false;
            marked |= bit;
        }
    }
    return true;
}