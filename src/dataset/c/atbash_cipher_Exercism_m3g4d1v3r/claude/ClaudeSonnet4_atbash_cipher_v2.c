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

static inline char atbash_transform(char chr) {
    if (is_lowercase(chr)) {
        return 'z' - (chr - 'a');
    } else if (is_uppercase(chr)) {
        return 'Z' - (chr - 'A');
    }
    return chr;
}

char *atbash_encode(const char *input) {
    const char *src = input;
    int input_len = 0;
    
    // Calculate required length
    while (*src) {
        if (is_lowercase(*src) || is_uppercase(*src) || is_digit(*src)) {
            input_len++;
        }
        src++;
    }
    
    int result_len = input_len + (input_len - 1) / GROUPS_LEN;
    char *result = malloc(result_len + 1);
    char *dst = result;
    int count = 0;
    
    while (*input) {
        if (count == GROUPS_LEN && (is_lowercase(*input) || is_uppercase(*input) || is_digit(*input))) {
            *dst++ = ' ';
            count = 0;
        }
        
        if (is_lowercase(*input) || is_uppercase(*input)) {
            *dst++ = 'a' + ('z' - (*input | 0x20));
            count++;
        } else if (is_digit(*input)) {
            *dst++ = *input;
            count++;
        }
        input++;
    }
    
    *dst = '\0';
    return result;
}

char *atbash_decode(const char *input) {
    const char *src = input;
    int input_len = 0;
    
    // Calculate required length
    while (*src) {
        if (is_lowercase(*src) || is_uppercase(*src) || is_digit(*src)) {
            input_len++;
        }
        src++;
    }
    
    char *result = malloc(input_len + 1);
    char *dst = result;
    
    while (*input) {
        if (is_lowercase(*input) || is_uppercase(*input)) {
            *dst++ = atbash_transform(*input);
        } else if (is_digit(*input)) {
            *dst++ = *input;
        }
        input++;
    }
    
    *dst = '\0';
    return result;
}