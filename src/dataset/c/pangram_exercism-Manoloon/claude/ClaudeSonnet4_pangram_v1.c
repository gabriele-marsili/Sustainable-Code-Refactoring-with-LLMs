#include "pangram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

bool is_pangram(const char *sentence) 
{ 
    if(sentence == NULL) return false;
    
    unsigned int marked = 0;
    const unsigned int all_letters = 0x3FFFFFF; // 26 bits set
    
    for(const char *p = sentence; *p && marked != all_letters; ++p)
    {
        if(*p >= 'A' && *p <= 'Z')
        {
            marked |= 1U << (*p - 'A');
        }
        else if(*p >= 'a' && *p <= 'z')
        {
            marked |= 1U << (*p - 'a');
        }
    }
    
    return marked == all_letters;
}