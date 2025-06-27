#include "rotational_cipher.h"

int mod(int a, int b) {
    int result;

    result = a % b;
    if (result < 0) {
        result += b;
    }
    return (result);
}

char *rotate(const char *text, int shift_key) {
    size_t input_len;
    char *result;

    input_len = strlen(text);
    if (input_len == 0) return (NULL);
    result = malloc(sizeof(char) * ++input_len);
    if (result == NULL) return (NULL);
    while (*text != '\0') {
        if (*text >= 'a' && *text <= 'z') {
            *result++ = mod(*text++ - 'a' + shift_key, ALPHABET_SIZE) + 'a';
        } else if (*text >= 'A' && *text <= 'Z') {
            *result++ = mod(*text++ - 'A' + shift_key, ALPHABET_SIZE) + 'A';
        } else {
            *result++ = *text++;
        }
    }
    *result++ = '\0';
    result -= input_len;
    return (result);
}
