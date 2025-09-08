#include "isogram.h"
#include <stdbool.h>
#include <string.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;

    bool alphabet_flags[ALPHABET_SIZE] = {false};
    char chr;

    while ((chr = *phrase++) != '\0') {
        if (chr >= 'a' && chr <= 'z') {
            if (alphabet_flags[chr - 'a']) return false;
            alphabet_flags[chr - 'a'] = true;
        } else if (chr >= 'A' && chr <= 'Z') {
            if (alphabet_flags[chr - 'A']) return false;
            alphabet_flags[chr - 'A'] = true;
        }
    }
    return true;
}