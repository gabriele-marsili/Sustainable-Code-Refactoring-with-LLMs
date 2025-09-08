#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

int isIsogram(const char *string) {
    bool seen[26] = {false};
    
    for (const char *ptr = string; *ptr; ptr++) {
        if (isalpha(*ptr)) {
            int index = tolower(*ptr) - 'a';
            if (seen[index]) {
                return 0;
            }
            seen[index] = true;
        }
    }
    
    return 1;
}