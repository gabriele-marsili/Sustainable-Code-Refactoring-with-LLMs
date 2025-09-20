#include "atbash_cipher.h"

static inline bool is_digit(const char chr) {
    return (chr >= '0' && chr <= '9');
}

static inline bool is_uppercase(const char chr) {
    return (chr >= 'A' && chr <= 'Z');
}

static inline bool is_lowercase(const char chr) {
    return (chr >= 'a' && chr <= 'z');
}

static inline int atbash_transform(int idx) {
    return ALPHABET_SIZE - 1 - idx;
}

char *atbash_encode(const char *input) {
    char *result = malloc(MAX_OUTPUT);
    char *res_ptr = result;
    int count = 0;

    while (*input) {
        if (count == GROUPS_LEN && *(input + 1)) {
            *res_ptr++ = ' ';
            count = 0;
        }
        if (is_lowercase(*input)) {
            *res_ptr++ = 'a' + atbash_transform(*input - 'a');
            count++;
        } else if (is_uppercase(*input)) {
            *res_ptr++ = 'a' + atbash_transform(*input - 'A');
            count++;
        } else if (is_digit(*input)) {
            *res_ptr++ = *input;
            count++;
        }
        input++;
    }
    *res_ptr = '\0';
    return result;
}

char *atbash_decode(const char *input) {
    char *result = malloc(MAX_OUTPUT);
    char *res_ptr = result;

    while (*input) {
        if (is_lowercase(*input)) {
            *res_ptr++ = 'a' + atbash_transform(*input - 'a');
        } else if (is_uppercase(*input)) {
            *res_ptr++ = 'A' + atbash_transform(*input - 'A');
        } else if (is_digit(*input)) {
            *res_ptr++ = *input;
        }
        input++;
    }
    *res_ptr = '\0';
    return result;
}