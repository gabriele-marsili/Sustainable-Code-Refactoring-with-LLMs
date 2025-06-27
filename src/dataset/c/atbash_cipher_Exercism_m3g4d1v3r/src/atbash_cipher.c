#include "atbash_cipher.h"

bool is_digit(const char chr) {
    if (chr >= '0' && chr <= '9') return (true);
    return (false);
}

bool is_uppercase(const char chr) {
    if (chr >= 'A' && chr <= 'Z') return (true);
    return (false);
}

bool is_lowercase(const char chr) {
    if (chr >= 'a' && chr <= 'z') return (true);
    return (false);
}

int modulus(int a, int b) {
    if (a < 0) return (a + b) % b;
    return a % b;
}

char *atbash_encode(const char *input) {
    int idx, len, count;
    char *result;

    count = 0;
    len = 0;
    result = malloc(sizeof(char) * (MAX_OUTPUT));
    while (*input != '\0') {
        if (count == GROUPS_LEN && *(input + 1) != '\0') {
            *result++ = ' ';
            count = 0;
            len++;
        }
        if (is_lowercase(*input) || is_uppercase(*input)) {
            idx = is_lowercase(*input) ? *input - 'a' : *input - 'A';
            idx = modulus(idx - (2 * idx + 1), ALPHABET_SIZE);
            *result++ = 'a' + idx;
            count++;
            len++;
        } else if (is_digit(*input)) {
            *result++ = *input;
            count++;
            len++;
        }
        input++;
    }
    *result = '\0';
    return (result - len);
}

char *atbash_decode(const char *input) {
    int idx, len;
    char *result;

    len = 0;
    result = malloc(sizeof(char) * (MAX_OUTPUT));
    while (*input != '\0') {
        if (is_lowercase(*input) || is_uppercase(*input)) {
            idx = is_lowercase(*input) ? *input - 'a' : *input - 'A';
            idx = modulus(idx - (2 * idx + 1), ALPHABET_SIZE);
            *result++ = is_lowercase(*input) ? 'a' + idx : 'A' + idx;
            len++;
        } else if (is_digit(*input)) {
            *result++ = *input;
            len++;
        }
        input++;
    }
    *result = '\0';
    return (result - len);
}
