#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAGIC 219
#define SPACE ' '

/* modes: 0 = decode; 1 = encode */
char *parse(char *input, int mode) {
    int len = strlen(input);
    int space_count = 0;
    for (int i = 0; i < len; ++i) {
        if (isalnum(input[i])) {
            space_count++;
        }
    }

    int encoded_len = len + (mode ? (space_count - 1) / 5 : 0);
    char *tmp = (char*) malloc(encoded_len + 1);
    if (tmp == NULL) {
        return NULL;
    }

    char *res = tmp;
    int count = 0;
    for (int i = 0; i < len; ++i) {
        char c = input[i];
        if (isalnum(c)) {
            if (mode && count > 0 && count % 5 == 0) {
                *tmp++ = SPACE;
            }

            if (isalpha(c)) {
                *tmp++ = MAGIC - tolower(c);
            } else {
                *tmp++ = c;
            }
            count++;
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