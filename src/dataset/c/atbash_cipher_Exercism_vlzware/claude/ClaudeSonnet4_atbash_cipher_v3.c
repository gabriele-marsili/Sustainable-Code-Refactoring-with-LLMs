#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

static inline char atbash_transform(char c) {
    return 'z' - (c - 'a');
}

static size_t calculate_output_size(const char *input, int mode) {
    size_t len = 0;
    size_t char_count = 0;
    
    while (*input) {
        if (isalnum(*input)) {
            len++;
            char_count++;
        }
        input++;
    }
    
    if (mode && char_count > 5) {
        len += (char_count - 1) / 5;
    }
    
    return len + 1;
}

char *parse(char *input, int mode) {
    if (!input) return NULL;
    
    size_t output_size = calculate_output_size(input, mode);
    char *result = malloc(output_size);
    if (!result) return NULL;
    
    char *output = result;
    int count = 0;
    
    while (*input) {
        char c = *input++;
        
        if (isalpha(c)) {
            if (mode && count == 5) {
                *output++ = ' ';
                count = 0;
            }
            *output++ = atbash_transform(tolower(c));
            count += mode;
        } else if (isdigit(c)) {
            if (mode && count == 5) {
                *output++ = ' ';
                count = 0;
            }
            *output++ = c;
            count += mode;
        }
    }
    
    *output = '\0';
    return result;
}

char *atbash_encode(char *input) {
    return parse(input, 1);
}

char *atbash_decode(char *input) {
    return parse(input, 0);
}