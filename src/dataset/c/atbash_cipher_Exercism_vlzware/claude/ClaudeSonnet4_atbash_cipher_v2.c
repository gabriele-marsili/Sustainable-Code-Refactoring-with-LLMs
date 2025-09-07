#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

static inline char atbash_transform(char c) {
    return 'z' - (c - 'a');
}

static inline void add_space_if_needed(char **output, int *count) {
    if (*count == 5) {
        *count = 0;
        *(*output)++ = ' ';
    }
}

static char *parse_optimized(const char *input, int mode) {
    const char *src = input;
    int input_len = 0;
    int output_chars = 0;
    
    // Single pass to count input length and output characters
    while (*src) {
        if (isalnum(*src)) {
            output_chars++;
        }
        input_len++;
        src++;
    }
    
    if (output_chars == 0) {
        char *empty = malloc(1);
        if (empty) *empty = '\0';
        return empty;
    }
    
    // Calculate exact buffer size needed
    int buffer_size = output_chars + (mode ? (output_chars - 1) / 5 : 0) + 1;
    char *result = malloc(buffer_size);
    if (!result) return NULL;
    
    char *output = result;
    int count = 0;
    src = input;
    
    while (*src) {
        char c = *src;
        if (isalpha(c)) {
            if (mode) add_space_if_needed(&output, &count);
            c = tolower(c);
            *output++ = atbash_transform(c);
            count += mode;
        } else if (isdigit(c)) {
            if (mode) add_space_if_needed(&output, &count);
            *output++ = c;
            count += mode;
        }
        src++;
    }
    
    *output = '\0';
    return result;
}

char *atbash_encode(char *input) {
    return parse_optimized(input, 1);
}

char *atbash_decode(char *input) {
    return parse_optimized(input, 0);
}