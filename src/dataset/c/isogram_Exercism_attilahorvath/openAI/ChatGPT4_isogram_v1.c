#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

int isIsogram(const char *string) {
    bool seen[26] = {false};

    for (int i = 0; string[i] != '\0'; i++) {
        char c = tolower(string[i]);

        if (c >= 'a' && c <= 'z') {
            if (seen[c - 'a']) {
                return 0;
            }
            seen[c - 'a'] = true;
        }
    }

    return 1;
}