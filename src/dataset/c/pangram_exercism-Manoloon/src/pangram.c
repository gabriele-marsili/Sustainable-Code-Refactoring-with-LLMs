#include "pangram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

bool is_pangram(const char *sentence) 
{ 
    if(sentence == NULL) return false;
    size_t strLength = strlen(sentence);
    int marked[26] ={0};
    
    for(size_t i = 0; i < strLength;++i)
    {
        int item = tolower(sentence[i]);
        if(item >= 'a' && item <= 'z')
        {
            marked[item - 'a'] = sentence[i];
        }
    }
    for(int i = 0; i < 26; ++i)
    {
        if (marked[i] == 0) return false;
    }
    return true; 
}
