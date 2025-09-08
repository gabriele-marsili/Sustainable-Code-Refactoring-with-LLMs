#include <ctype.h>
#include <string.h>
#include "isogram.h"

int isIsogram(char *word) {
    int seen[26] = {0};
    for (char *p = word; *p; p++) {
        char letter = tolower(*p);
        if (letter >= 'a' && letter <= 'z') {
            if (seen[letter - 'a'])
                return 0;
            seen[letter - 'a'] = 1;
        }
    }
    return 1;
}