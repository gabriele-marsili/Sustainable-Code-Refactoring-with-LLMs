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
    for (const char *ptr = text; *ptr != '\0'; ++ptr) {
        if (*ptr >= 'a' && *ptr <= 'z') {
            *res_ptr++ = mod(*ptr - 'a' + shift_key, ALPHABET_SIZE) + 'a';
        } else if (*ptr >= 'A' && *ptr <= 'Z') {
            *res_ptr++ = mod(*ptr - 'A' + shift_key, ALPHABET_SIZE) + 'A';
        } else {
            *res_ptr++ = *ptr;
        }
    }
    *res_ptr = '\0';
    return result;
}