#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

int isIsogram(const char *string) {
    if (string == NULL) {
        return 1;
    }

    bool seen[26] = {false};
    int c;

    for (int i = 0; (c = string[i]) != '\0'; i++) {
        c = tolower(c);

        if (c >= 'a' && c <= 'z') {
            int index = c - 'a';
            if (seen[index]) {
                return 0;
            }
            seen[index] = true;
        }
    }

    return 1;
}