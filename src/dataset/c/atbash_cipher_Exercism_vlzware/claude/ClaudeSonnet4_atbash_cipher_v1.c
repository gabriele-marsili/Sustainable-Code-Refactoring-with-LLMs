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

/* modes: 0 = decode; 1 = encode */
char *parse(char *input, int mode)
{
    if (!input) return NULL;
    
    int len = strlen(input);
    int max_spaces = mode ? len / 5 : 0;
    char *tmp = (char*) malloc(len + max_spaces + 1);
    if (tmp == NULL)
        return NULL;

    char *res = tmp;
    int count = 0;
    char c;
    
    while ((c = *input++)) {
        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
            if (mode) addspace(&tmp, &count);
            *tmp++ = MAGIC - (c | 32);  // Convert to lowercase using bitwise OR
            count += mode;
        } else if (c >= '0' && c <= '9') {
            if (mode) addspace(&tmp, &count);
            *tmp++ = c;
            count += mode;
        }
    }
    *tmp = '\0';
    return res;
}

char *atbash_encode(char *input)
{
    return parse(input, 1);
}

char *atbash_decode(char *input)
{
    return parse(input, 0);
}