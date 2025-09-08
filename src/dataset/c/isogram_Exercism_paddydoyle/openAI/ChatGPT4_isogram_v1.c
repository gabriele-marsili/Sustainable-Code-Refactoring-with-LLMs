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
            if (GET_BIT(mask, c - 'a')) {
                return false;
            }
            SET_BIT(mask, c - 'a');
        }
    }

    return true;
}