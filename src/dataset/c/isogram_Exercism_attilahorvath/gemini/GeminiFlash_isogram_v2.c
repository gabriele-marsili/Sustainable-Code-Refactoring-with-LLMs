#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

bool isIsogram(const char *string) {
    if (string == NULL) {
        return true;
    }

    bool seen[26] = {false};
    for (int i = 0; string[i] != '\0'; i++) {
        char c = tolower(string[i]);
        if (c >= 'a' && c <= 'z') {
            int index = c - 'a';
            if (seen[index]) {
                return false;
            }
            seen[index] = true;
        }
    }
    return true;
}