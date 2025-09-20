#include "isogram.h"

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    unsigned int alphabet_mask = 0;
    char chr;

    while ((chr = *phrase++) != '\0') {
        if (chr >= 'a' && chr <= 'z') {
            unsigned int bit = 1U << (chr - 'a');
            if (alphabet_mask & bit) return false;
            alphabet_mask |= bit;
        } else if (chr >= 'A' && chr <= 'Z') {
            unsigned int bit = 1U << (chr - 'A');
            if (alphabet_mask & bit) return false;
            alphabet_mask |= bit;
        }
    }
    return true;
}