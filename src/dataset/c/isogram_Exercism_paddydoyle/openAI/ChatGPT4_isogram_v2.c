#include "isogram.h"
#include <ctype.h>

#define SET_BIT(mask, pos) (mask |= (1U << (pos)))
#define GET_BIT(mask, pos) ((mask >> (pos)) & 1U)

bool is_isogram(const char phrase[]) {
    if (!phrase) {
        return false;
    }

    unsigned int mask = 0;

    for (const char *ptr = phrase; *ptr; ++ptr) {
        char c = *ptr;

        if (isalpha(c)) {
            c = tolower(c);
            int pos = c - 'a';

            if (GET_BIT(mask, pos)) {
                return false;
            }

            SET_BIT(mask, pos);
        }
    }

    return true;
}