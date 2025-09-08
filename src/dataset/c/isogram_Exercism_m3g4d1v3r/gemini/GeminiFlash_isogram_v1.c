#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) {
        return false;
    }

    size_t alphabet_array[ALPHABET_SIZE] = {0}; // Initialize array directly

    for (const char *p = phrase; *p != '\0'; ++p) {
        char chr = *p;
        if (isalpha(chr)) {
            chr = tolower(chr);
            size_t index = chr - 'a';
            if (alphabet_array[index] != 0) {
                return false;
            }
            alphabet_array[index] = 1;
        }
    }

    return true;
}