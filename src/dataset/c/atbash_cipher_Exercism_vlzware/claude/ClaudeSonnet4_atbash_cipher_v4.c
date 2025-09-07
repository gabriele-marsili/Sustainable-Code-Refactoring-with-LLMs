#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAGIC 219

static inline void addspace(char **tmp, int *count)
{
    if (*count == 5) {
        *count = 0;
        *(*tmp)++ = ' ';
    }
}

char *parse(char *input, int mode)
{
    const char *src = input;
    int len = 0;
    int char_count = 0;
    
    while (*src) {
        if (isalnum(*src)) {
            char_count++;
        }
        src++;
        len++;
    }
    
    int alloc_size = char_count + (mode ? (char_count - 1) / 5 : 0) + 1;
    char *result = malloc(alloc_size);
    if (!result) return NULL;
    
    char *dst = result;
    int count = 0;
    
    while (*input) {
        char c = *input++;
        if (isalpha(c)) {
            if (mode) addspace(&dst, &count);
            *dst++ = MAGIC - (c | 32);
            count += mode;
        } else if (isdigit(c)) {
            if (mode) addspace(&dst, &count);
            *dst++ = c;
            count += mode;
        }
    }
    *dst = '\0';
    return result;
}

char *atbash_encode(char *input)
{
    return parse(input, 1);
}

char *atbash_decode(char *input)
{
    return parse(input, 0);
}