#include "pangram.h"

bool alphabet_array[ALPHABET_SIZE];

void clear_alphabet_array() {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        alphabet_array[idx] = false;
    }
}

bool is_pangram(const char *sentence) {
    if (sentence == NULL) return (false);
    size_t input_size = strlen(sentence);
    char chr;

    clear_alphabet_array();
    for (size_t idx = 0; idx < input_size; idx++) {
        chr = sentence[idx];
        if (chr >= 'a' && chr <= 'z') {
            alphabet_array[chr - 'a'] = true;
        } else if (chr >= 'A' && chr <= 'Z') {
            alphabet_array[chr - 'A'] = true;
        }
    }
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (alphabet_array[idx] == false) {
            clear_alphabet_array();
            return (false);
        }
    }
    clear_alphabet_array();
    return (true);
}
