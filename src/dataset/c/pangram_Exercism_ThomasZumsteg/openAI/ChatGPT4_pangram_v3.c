#include "pangram.h"
#include <ctype.h>

#define LETTERS 26

int letter(char c) {
    c = tolower((unsigned char)c);
    return (c >= 'a' && c <= 'z') ? c - 'a' : -1;
}

int is_pangram(const char *words) {
    if (!words) return 0;
    unsigned int seen = 0;
    int count = 0;
    for (const char *p = words; *p && count < LETTERS; p++) {
        int l = letter(*p);
        if (l >= 0 && !(seen & (1u << l))) {
            seen |= 1u << l;
            count++;
        }
    }
    return count == LETTERS;
}