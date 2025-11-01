#include "isogram.h"
#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    size_t len = strlen(phrase);
    if (len == 0) return true;

    bool seen[26] = {false};

    for (size_t i = 0; i < len; ++i) {
        char c = tolower(phrase[i]);
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