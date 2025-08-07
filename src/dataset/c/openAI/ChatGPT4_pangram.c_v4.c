#include "pangram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_pangram(const char *sentence)
{
    if (sentence == NULL)
        return false;

    bool seen[26] = { false };
    int count = 0;

    for (const char *p = sentence; *p != '\0'; ++p)
    {
        if (isalpha((unsigned char)*p))
        {
            int index = tolower((unsigned char)*p) - 'a';
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