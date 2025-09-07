#include "rotational_cipher.h"

static inline int mod(int a, int b) {
    return (a % b + b) % b;
}

char *rotate(const char *text, int shift_key) {
    if (!text || *text == '\0') return NULL;

    size_t input_len = strlen(text);
    char *result = malloc(input_len + 1);
    if (!result) return NULL;

    char *res_ptr = result;
    for (const char *ptr = text; *ptr; ++ptr) {
        char c = *ptr;
        if (c >= 'a' && c <= 'z') {
            *res_ptr++ = mod(c - 'a' + shift_key, ALPHABET_SIZE) + 'a';
        } else if (c >= 'A' && c <= 'Z') {
            *res_ptr++ = mod(c - 'A' + shift_key, ALPHABET_SIZE) + 'A';
        } else {
            *res_ptr++ = c;
        }
    }
    *res_ptr = '\0';
    return result;
}