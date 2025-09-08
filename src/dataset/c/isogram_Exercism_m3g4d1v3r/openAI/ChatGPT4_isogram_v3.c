#include "isogram.h"

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    size_t alphabet_array[ALPHABET_SIZE] = {0};
    char chr;

    while ((chr = *phrase++) != '\0') {
        if (chr >= 'a' && chr <= 'z') {
            if (++alphabet_array[chr - 'a'] > 1) return false;
        } else if (chr >= 'A' && chr <= 'Z') {
            if (++alphabet_array[chr - 'A'] > 1) return false;
        }
    }
    return true;
}