#include "isogram.h"

size_t alphabet_array[ALPHABET_SIZE];

void clear_array(size_t *input_array, size_t length) {
    for (size_t i = 0; i < length; i++) {
        input_array[i] = 0;
    }
}

bool is_isogram(const char phrase[]) {
    char chr;

    clear_array(alphabet_array, ALPHABET_SIZE);
    if (phrase == NULL) return (false);
    while (*phrase != '\0') {
        chr = *phrase++;
        if (chr >= 'a' && chr <= 'z') {
            if (alphabet_array[chr - 'a'] == 1) return (false);
            alphabet_array[chr - 'a']++;
        } else if (chr >= 'A' && chr <= 'Z') {
            if (alphabet_array[chr - 'A'] == 1) return (false);
            alphabet_array[chr - 'A']++;
        }
    }
    return (true);
}
