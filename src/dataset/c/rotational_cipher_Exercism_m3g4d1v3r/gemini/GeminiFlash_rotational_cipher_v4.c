#include "rotational_cipher.h"

char *rotate(const char *text, int shift_key) {
    size_t input_len;
    char *result;
    const char *original_text;
    char *original_result;

    if (text == NULL) return NULL;

    input_len = strlen(text);
    if (input_len == 0) return NULL;

    result = malloc(sizeof(char) * (input_len + 1));
    if (result == NULL) return NULL;

    original_text = text;
    original_result = result;

    for (size_t i = 0; i < input_len; ++i) {
        char c = *text++;
        if (c >= 'a' && c <= 'z') {
            *result++ = (char)(((c - 'a' + shift_key) % ALPHABET_SIZE + ALPHABET_SIZE) % ALPHABET_SIZE + 'a');
        } else if (c >= 'A' && c <= 'Z') {
            *result++ = (char)(((c - 'A' + shift_key) % ALPHABET_SIZE + ALPHABET_SIZE) % ALPHABET_SIZE + 'A');
        } else {
            *result++ = c;
        }
    }
    *result = '\0';

    return original_result;
}