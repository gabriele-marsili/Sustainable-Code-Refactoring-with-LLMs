#include "pangram.h"

bool is_pangram(const char *sentence)
{
    bool seen[26] = {false};
    int count = 0;
    
    if (sentence == NULL)
        return false;
    
    for (int i = 0; sentence[i] != '\0'; i++)
    {
        char c = sentence[i];
        if (c >= 'a' && c <= 'z')
        {
            int index = c - 'a';
            if (!seen[index])
            {
                seen[index] = true;
                if (++count == 26)
                    return true;
            }
        }
        else if (c >= 'A' && c <= 'Z')
        {
            int index = c - 'A';
            if (!seen[index])
            {
                seen[index] = true;
                if (++count == 26)
                    return true;
            }
        }
    }
    
    return false;
}