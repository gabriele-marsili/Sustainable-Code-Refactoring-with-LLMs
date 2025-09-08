#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
    if (!phrase)
        return false;

    unsigned int alpha_flags = 0;
    for (int i = 0; phrase[i] != '\0'; i++) {
        if (isalpha((unsigned char)phrase[i])) {
            int alpha_i = tolower((unsigned char)phrase[i]) - 'a';
            unsigned int mask = 1U << alpha_i;
            if (alpha_flags & mask)
                return false;
            alpha_flags |= mask;
        }
    }
    return true;
}