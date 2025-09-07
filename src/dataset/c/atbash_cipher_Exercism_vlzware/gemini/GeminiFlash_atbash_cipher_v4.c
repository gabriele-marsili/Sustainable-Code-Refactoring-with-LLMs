#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

#define MAGIC 219
#define GROUP_SIZE 5

char *parse(char *input, int mode) {
    size_t len = strlen(input);
    size_t space_count = 0;
    size_t encoded_len = 0;

    // Pre-calculate the required length
    for (size_t i = 0; i < len; ++i) {
        if (isalnum(input[i])) {
            encoded_len++;
            if (mode == 1) {
                space_count++;
            }
        }
    }

    if (mode == 1) {
        space_count = (space_count + GROUP_SIZE - 1) / GROUP_SIZE -1; // Avoid trailing space
    } else {
        space_count = 0;
    }

    char *result = (char *)malloc(encoded_len + space_count + 1);
    if (result == NULL) {
        return NULL;
    }

    char *ptr = result;
    size_t count = 0;

    for (size_t i = 0; i < len; ++i) {
        if (isalnum(input[i])) {
            if (mode == 1 && count > 0 && count % GROUP_SIZE == 0) {
                *ptr++ = ' ';
            }

            if (isalpha(input[i])) {
                *ptr++ = MAGIC - tolower(input[i]);
            } else {
                *ptr++ = input[i];
            }
            count++;
        }
    }

    *ptr = '\0';
    return result;
}

char *atbash_encode(char *input) {
    return parse(input, 1);
}

char *atbash_decode(char *input) {
    return parse(input, 0);
}