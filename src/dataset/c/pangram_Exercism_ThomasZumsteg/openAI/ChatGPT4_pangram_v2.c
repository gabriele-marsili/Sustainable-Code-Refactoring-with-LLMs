#include "pangram.h"
#include <ctype.h>

#define LETTERS 26

int is_pangram(const char *words) {
    if (!words) return 0;

    unsigned int seen = 0;
    int count = 0;

    for (const char *p = words; *p && count < LETTERS; ++p) {
        if (isalpha((unsigned char)*p)) {
            int bit = tolower((unsigned char)*p) - 'a';
            if (!(seen & (1 << bit))) {
                seen |= (1 << bit);
                count++;
            }
        }
    }

    return count == LETTERS;
}