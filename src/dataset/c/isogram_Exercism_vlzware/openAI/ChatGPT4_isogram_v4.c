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

        if (c < 'a' || c > 'z')
            return false;

        unsigned int mask = 1U << (c - 'a');
        if (letters & mask)
            return false;

        letters |= mask;
    }
    return true;
}