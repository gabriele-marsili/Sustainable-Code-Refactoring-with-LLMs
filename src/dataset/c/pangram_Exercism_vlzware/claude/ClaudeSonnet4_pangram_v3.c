#include <stdbool.h>
#include <ctype.h>
#include <stddef.h>

#define ALL 26

bool is_pangram(const char *sentence)
{
    if (sentence == NULL || *sentence == '\0')
        return false;

    unsigned int seen = 0;
    const unsigned int target = (1U << ALL) - 1;

    while (*sentence) {
        if ((*sentence | 32) >= 'a' && (*sentence | 32) <= 'z') {
            unsigned int bit = 1U << ((*sentence | 32) - 'a');
            seen |= bit;
            if (seen == target)
                return true;
        }
        sentence++;
    }

    return false;
}