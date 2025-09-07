#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAGIC 219

static inline void addspace_if_needed(char **tmp, int *count, int mode) {
    if (mode && *count == 5) {
        *count = 0;
        *(*tmp)++ = ' ';
    }
}

static inline void process_char(char **tmp, char c, int *count, int mode) {
    **tmp = c;
    (*tmp)++;
    if (mode) (*count)++;
}

char *parse(char *input, int mode) {
    int len = strlen(input);
    char *res = (char *)malloc(len + (mode ? len / 5 : 0) + 1);
    if (!res) return NULL;

    char *tmp = res;
    int count = 0;

    for (; *input; input++) {
        if (isalpha(*input)) {
            addspace_if_needed(&tmp, &count, mode);
            process_char(&tmp, MAGIC - tolower(*input), &count, mode);
        } else if (isdigit(*input)) {
            addspace_if_needed(&tmp, &count, mode);
            process_char(&tmp, *input, &count, mode);
        }
    }
    *tmp = '\0';
    return res;
}

char *atbash_encode(char *input) {
    return parse(input, 1);
}

char *atbash_decode(char *input) {
    return parse(input, 0);
}