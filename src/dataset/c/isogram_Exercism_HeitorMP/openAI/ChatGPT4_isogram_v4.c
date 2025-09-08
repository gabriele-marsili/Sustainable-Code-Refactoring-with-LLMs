#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
    if (!phrase)
        return false;

    unsigned int alpha_mask = 0;
    for (const char *p = phrase; *p; ++p) {
        if (isalpha((unsigned char)*p)) {
            unsigned int bit = 1u << (tolower((unsigned char)*p) - 'a');
            if (alpha_mask & bit)
                return false;
            alpha_mask |= bit;
        }
    }
    return true;
}