#include "atbash_cipher.h"
#include <ctype.h>

static inline char atbash_transform(char c) {
    if (isalpha(c)) {
        char base = islower(c) ? 'a' : 'A';
        return base + (25 - (c - base));
    }
    return c;
}

bool is_digit(const char chr) {
    return chr >= '0' && chr <= '9';
}

bool is_uppercase(const char chr) {
    return chr >= 'A' && chr <= 'Z';
}

bool is_lowercase(const char chr) {
    return chr >= 'a' && chr <= 'z';
}

int modulus(int a, int b) {
    return a < 0 ? (a + b) % b : a % b;
}

char *atbash_encode(const char *input) {
    char *result = malloc(sizeof(char) * MAX_OUTPUT);
    char *output = result;
    int count = 0;
    
    while (*input) {
        if (count == GROUPS_LEN && *(input + 1)) {
            *output++ = ' ';
            count = 0;
        }
        
        if (isalpha(*input)) {
            *output++ = tolower(atbash_transform(*input));
            count++;
        } else if (isdigit(*input)) {
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
    
    while (*input) {
        if (isalpha(*input)) {
            *output++ = atbash_transform(*input);
        } else if (isdigit(*input)) {
            *output++ = *input;
        }
        input++;
    }
    *output = '\0';
    return result;
}