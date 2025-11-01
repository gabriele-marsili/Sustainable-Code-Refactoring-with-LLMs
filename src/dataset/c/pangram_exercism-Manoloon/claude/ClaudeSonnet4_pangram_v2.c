#include "pangram.h"
#include <stdlib.h>
#include <ctype.h>

bool is_pangram(const char *sentence) 
{ 
    if(sentence == NULL) return false;
    
    unsigned int seen = 0;
    const unsigned int all_letters = 0x3FFFFFF; // 26 bits set
    
    for(const char *p = sentence; *p && seen != all_letters; ++p)
    {
        if(*p >= 'A' && *p <= 'Z')
        {
            seen |= 1U << (*p - 'A');
        }
        else if(*p >= 'a' && *p <= 'z')
        {
            seen |= 1U << (*p - 'a');
        }
    }
    
    return seen == all_letters;
}