#include <stdbool.h>
#include <ctype.h>

#define CCOUNT 26

bool is_isogram(const char phrase[])
{
    unsigned int letters = 0;

    for (int i = 0; phrase[i] != '\0'; i++) {
        char c = tolower(phrase[i]);

        if (c == ' ' || c == '-')
            continue;

        if (!isalpha(c))
            return false;

        int bit = c - 'a';
        if (letters & (1 << bit))
            return false;

        letters |= (1 << bit);
    }
    return true;
}