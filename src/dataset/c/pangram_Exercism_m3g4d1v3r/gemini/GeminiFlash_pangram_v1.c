#include "pangram.h"

static unsigned int alphabet_mask;

#ifndef ALPHABET_FULL_MASK
#define ALPHABET_FULL_MASK ((1U << ALPHABET_SIZE) - 1U)
#endif

void clear_alphabet_array() {
    alphabet_mask = 0U;
}

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    clear_alphabet_array();

    for (size_t idx = 0; sentence[idx] != '\0'; ++idx) {
        char chr = sentence[idx];

        if (chr >= 'a' && chr <= 'z') {
            alphabet_mask |= (1U << (chr - 'a'));
        } else if (chr >= 'A' && chr <= 'Z') {
            alphabet_mask |= (1U << (chr - 'A'));
        }

        if (alphabet_mask == ALPHABET_FULL_MASK) {
            return true;
        }
    }

    return (alphabet_mask == ALPHABET_FULL_MASK);
}