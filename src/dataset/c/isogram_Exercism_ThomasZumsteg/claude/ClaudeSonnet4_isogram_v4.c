#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    if (!word) return 1;
    
    unsigned int seen = 0;
    
    for (char *p = word; *p; p++) {
        char c = *p;
        if (c >= 'A' && c <= 'Z') {
            c += 32;
        } else if (c < 'a' || c > 'z') {
            continue;
        }
        
        unsigned int bit = 1u << (c - 'a');
        if (seen & bit) {
            return 0;
        }
        seen |= bit;
    }
    
    return 1;
}