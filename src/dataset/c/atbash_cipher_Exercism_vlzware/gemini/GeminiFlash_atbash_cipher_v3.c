#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

#define MAGIC 219
#define SPACE ' '

/* modes: 0 = decode; 1 = encode */
char *parse(const char *input, int mode) {
    size_t input_len = strlen(input);
    size_t space_count_est = (mode == 1) ? (input_len / 5) : 0;
    size_t output_len = input_len + space_count_est;

    char *output = (char *)malloc(output_len + 1);
    if (!output) {
        return NULL;
    }

    char *output_ptr = output;
    int char_count = 0;

    for (size_t i = 0; i < input_len; ++i) {
        char c = input[i];

        if (isalnum((unsigned char)c)) {
            if (mode == 1 && char_count == 5) {
                *output_ptr++ = SPACE;
                char_count = 0;
            }

            if (isalpha((unsigned char)c)) {
                *output_ptr++ = MAGIC - tolower((unsigned char)c);
            } else {
                *output_ptr++ = c;
            }

            if (mode == 1) {
                char_count++;
            }
        }
    }

    *output_ptr = '\0';
    return output;
}

char *atbash_encode(char *input) {
    return parse(input, 1);
}

char *atbash_decode(char *input) {
    return parse(input, 0);
}