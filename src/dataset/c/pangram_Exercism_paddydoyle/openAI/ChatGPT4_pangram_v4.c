#include "pangram.h"

#include <ctype.h>

#define N_CHARS 26
#define SET_BIT(mask, pos) (mask |= (1U << (pos)))

bool is_pangram(const char *sentence) {
    if (!sentence) {
        return false;
    }

    unsigned int mask = 0;
    unsigned int pangram_mask = (1U << N_CHARS) - 1;

    for (const char *p = sentence; *p; ++p) {
        if (isalpha((unsigned char)*p)) {
            unsigned int pos = tolower((unsigned char)*p) - 'a';
            SET_BIT(mask, pos);
            if (mask == pangram_mask) {
                return true;
            }
        }
    }

    return false;
}