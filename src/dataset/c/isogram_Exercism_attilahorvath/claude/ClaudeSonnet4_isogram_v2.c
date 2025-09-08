#include "isogram.h"
#include <ctype.h>

int isIsogram(const char *string) {
    unsigned int seen = 0;
    int c;
    
    for (int i = 0; (c = string[i]) != '\0'; i++) {
        if (c >= 'A' && c <= 'Z') {
            c = c + 32;
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