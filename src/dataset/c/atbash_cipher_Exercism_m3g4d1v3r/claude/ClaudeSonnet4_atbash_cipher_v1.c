#include "atbash_cipher.h"

static inline bool is_digit(const char chr) {
    return chr >= '0' && chr <= '9';
}

static inline bool is_uppercase(const char chr) {
    return chr >= 'A' && chr <= 'Z';
}

static inline bool is_lowercase(const char chr) {
    return chr >= 'a' && chr <= 'z';
}

static inline char atbash_transform(char c) {
    if (c >= 'a' && c <= 'z') {
        return 'z' - (c - 'a');
    } else if (c >= 'A' && c <= 'Z') {
        return 'z' - (c - 'A');
    }
    return c;
}

char *atbash_encode(const char *input) {
    char *result = malloc(sizeof(char) * MAX_OUTPUT);
    char *output = result;
    int count = 0;
    
    while (*input != '\0') {
        if (count == GROUPS_LEN && *(input + 1) != '\0') {
            *output++ = ' ';
            count = 0;
        }
        
        if (is_lowercase(*input) || is_uppercase(*input)) {
            *output++ = atbash_transform(*input);
            count++;
        } else if (is_digit(*input)) {
            *output++ = *input;
            count++;
        }
        input++;
    }
    *output = '\0';
    return result;
}

char *atbash_decode(const char *input) {
    char *result = malloc(sizeof(char) * MAX_OUTPUT);
    char *output = result;
    
    while (*input != '\0') {
        if (is_lowercase(*input) || is_uppercase(*input)) {
            *output++ = atbash_transform(*input);
        } else if (is_digit(*input)) {
            *output++ = *input;
        }
        input++;
    }
    *output = '\0';
    return result;
}