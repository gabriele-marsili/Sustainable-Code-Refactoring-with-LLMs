#include "pangram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_pangram(const char *sentence)
{
    if (sentence == NULL)
        return false;

    bool seen[26] = { false };
    int count = 0;

    for (int i = 0; sentence[i] != '\0'; i++)
    {
        if (isalpha(sentence[i]))
        {
            int index = tolower(sentence[i]) - 'a';
            if (!seen[index])
            {
                seen[index] = true;
                count++;
                if (count == 26)
                    return true;
            }
        }
    }
    return false;
}