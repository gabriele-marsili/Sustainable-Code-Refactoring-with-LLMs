#include "pangram.h"

bool alphabet_array[ALPHABET_SIZE];

void clear_alphabet_array() {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        alphabet_array[idx] = false;
    }
}

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    clear_alphabet_array();

    unsigned int letters_found_count = 0;

    for (const char *ptr = sentence; *ptr != '\0'; ++ptr) {
        char chr = *ptr;
        size_t index;

        if (chr >= 'a' && chr <= 'z') {
            index = chr - 'a';
        } else if (chr >= 'A' && chr <= 'Z') {
            index = chr - 'A';
        } else {
            continue; // Not an alphabet character, skip
        }

        if (!alphabet_array[index]) {
            alphabet_array[index] = true;
            letters_found_count++;

            if (letters_found_count == ALPHABET_SIZE) {
                return true; // Early exit: all letters found
            }
        }
    }

    return (letters_found_count == ALPHABET_SIZE);
}