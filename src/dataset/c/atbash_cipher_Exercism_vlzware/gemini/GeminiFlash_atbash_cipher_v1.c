#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

#define MAGIC 219
#define SPACE ' '

/* modes: false = decode; true = encode */
char *parse(char *input, bool mode) {
    size_t len = strlen(input);
    size_t space_count = 0;
    size_t encoded_len = 0;

    // Calculate the number of spaces needed during encoding
    if (mode) {
        for (size_t i = 0; i < len; ++i) {
            if (isalnum((unsigned char)input[i])) {
                encoded_len++;
            }
        }
        space_count = (encoded_len + 4) / 5;
    } else {
        encoded_len = len;
    }

    char *tmp = (char*) malloc(encoded_len + space_count + 1);
    if (tmp == NULL) return NULL;

    char *res = tmp;
    size_t count = 0;
    size_t i = 0;

    while (*input) {
        if (isalnum((unsigned char)*input)) {
            if (mode) {
                if (count == 5) {
                    *tmp++ = SPACE;
                    count = 0;
                }

                if (isalpha((unsigned char)*input)) {
                    *tmp++ = MAGIC - tolower((unsigned char)*input);
                } else {
                    *tmp++ = *input;
                }
                count++;
            } else {
                if (isalnum((unsigned char)*input)) {
                    *tmp++ = *input;
                }
            }
        }
        input++;
        i++;
    }
    *tmp = '\0';
    return res;
}

char *atbash_encode(char *input) {
    return parse(input, true);
}

char *atbash_decode(char *input) {
    return parse(input, false);
}