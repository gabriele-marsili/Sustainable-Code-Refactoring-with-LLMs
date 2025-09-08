#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    unsigned int seen = 0;
    char c;
    
    for (char *p = word; *p; p++) {
        c = *p | 32; // Fast lowercase conversion
        if (c >= 'a' && c <= 'z') {
            unsigned int bit = 1u << (c - 'a');
            if (seen & bit)
                return 0;
            seen |= bit;
        }
    }
    return 1;
}