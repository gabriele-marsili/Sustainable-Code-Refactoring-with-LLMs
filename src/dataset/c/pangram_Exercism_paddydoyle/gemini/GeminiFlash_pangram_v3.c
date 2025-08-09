#include "pangram.h"

#define N_CHARS 26

static const unsigned int PANGRAM_FULL_MASK = (1U << N_CHARS) - 1;

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    unsigned int encountered_mask = 0;

    for (const char *ptr = sentence; *ptr != '\0'; ++ptr) {
        char c = *ptr;

        if (c >= 'a' && c <= 'z') {
            // Character is already a lowercase English letter.
        } else if (c >= 'A' && c <= 'Z') {
            c += ('a' - 'A'); // Convert uppercase to lowercase.
        } else {
            // Not an English alphabet character, skip.
            continue;
        }

        unsigned int bit_pos = c - 'a';
        encountered_mask |= (1U << bit_pos);

        // Early exit: if all 26 letters are found, return true immediately.
        if (encountered_mask == PANGRAM_FULL_MASK) {
            return true;
        }
    }

    return encountered_mask == PANGRAM_FULL_MASK;
}