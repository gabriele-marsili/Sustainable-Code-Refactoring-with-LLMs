#include "rotational_cipher.h"

char *rotate(const char *text, int shift_key) {
    if (text == NULL || *text == '\0') {
        return NULL;
    }

    size_t input_len = strlen(text);
    char *result = malloc(input_len + 1);

    if (result == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < input_len; ++i) {
        char c = text[i];
        if (c >= 'a' && c <= 'z') {
            result[i] = (char)(((c - 'a' + shift_key) % ALPHABET_SIZE + ALPHABET_SIZE) % ALPHABET_SIZE + 'a');
        } else if (c >= 'A' && c <= 'Z') {
            result[i] = (char)(((c - 'A' + shift_key) % ALPHABET_SIZE + ALPHABET_SIZE) % ALPHABET_SIZE + 'A');
        } else {
            result[i] = c;
        }
    }

    result[input_len] = '\0';
    return result;
}