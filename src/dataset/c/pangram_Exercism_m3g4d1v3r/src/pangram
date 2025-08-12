#include "pangram.h"

bool is_pangram(const char *sentence) {
    if (sentence == NULL) return false;

    bool alphabet_array[ALPHABET_SIZE] = { false };
    int found = 0;

    for (const char *p = sentence; *p && found < ALPHABET_SIZE; ++p) {
        char chr = *p;
        if (chr >= 'a' && chr <= 'z') {
            int idx = chr - 'a';
            if (!alphabet_array[idx]) {
                alphabet_array[idx] = true;
                found++;
            }
        } else if (chr >= 'A' && chr <= 'Z') {
            int idx = chr - 'A';
            if (!alphabet_array[idx]) {
                alphabet_array[idx] = true;
                found++;
            }
        }
    }

    return found == ALPHABET_SIZE;
}