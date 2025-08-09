#include "pangram.h"
#include <ctype.h>

bool is_pangram(const char *sentence)
{
    bool seen[26] = {false};
    int unique_count = 0;
    
    if (sentence == NULL)
        return false;
    
    for (int i = 0; sentence[i] != '\0'; i++)
    {
        if (isalpha(sentence[i]))
        {
            int index = tolower(sentence[i]) - 'a';
            if (!seen[index])
            {
                seen[index] = true;
                unique_count++;
                if (unique_count == 26)
                    return true;
            }
        }
    }
    
    return false;
}