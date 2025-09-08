#include "isogram.h"
#include <stdbool.h>
#include <string.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    bool alphabet_flags[ALPHABET_SIZE] = {0};
    char chr;

    while ((chr = *phrase++) != '\0') {
        if (chr >= 'a' && chr <= 'z') {
            chr -= 'a';
        } else if (chr >= 'A' && chr <= 'Z') {
            chr -= 'A';
        } else {
            continue;
        }
        if (alphabet_flags[(size_t)chr]) return false;
        alphabet_flags[(size_t)chr] = true;
    }
    return true;
}