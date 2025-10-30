#include "isogram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

bool is_isogram(const char phrase[])
{
    if(phrase == NULL) return false;
    size_t size = strlen(phrase);
    int marked[26] = {0};
    for(size_t i = 0; i < size;++i )
    {
        char item = tolower(phrase[i]);
        if(item >= 'a' && item <= 'z')
        {
            marked[item - 'a'] += 1;
        }
    }
    for(size_t i = 0; i < 26;++i)
    {
        if(marked[i] > 1) return false;
    }
    return true;
}
