#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if(phrase == NULL) return false;
    
    int marked = 0;
    
    for(const char *p = phrase; *p; ++p)
    {
        char item = tolower(*p);
        if(item >= 'a' && item <= 'z')
        {
            int bit = 1 << (item - 'a');
            if(marked & bit) return false;
            marked |= bit;
        }
    }
    return true;
}