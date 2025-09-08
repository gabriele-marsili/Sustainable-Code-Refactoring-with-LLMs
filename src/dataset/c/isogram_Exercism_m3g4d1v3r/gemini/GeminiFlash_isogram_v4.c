#include "isogram.h"
#include <ctype.h>
#include <string.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    size_t alphabet_array[ALPHABET_SIZE] = {0};
    const char* p = phrase;

    while (*p) {
        unsigned char c = (unsigned char)*p;
        if (isalpha(c)) {
            c = tolower(c);
            size_t index = c - 'a';
            if (alphabet_array[index]) {
                return false;
            }
            alphabet_array[index] = 1;
        }
        p++;
    }

    return true;
}