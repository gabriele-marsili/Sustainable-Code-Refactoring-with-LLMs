#include "run_length_encoding.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *encode(char *input) {
    if (input == NULL || *input == '\0') {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = strlen(input);
    char *result = malloc(2 * input_len * sizeof(char) + 1); // Allocate enough memory
    if (!result) return NULL;

    char prev = *input;
    int count = 1;
    char *p_result = result;

    for (size_t i = 1; i < input_len; ++i) {
        if (input[i] == prev) {
            count++;
        } else {
            if (count > 1) {
                p_result += sprintf(p_result, "%d%c", count, prev);
            } else {
                *p_result++ = prev;
            }
            prev = input[i];
            count = 1;
        }
    }

    if (count > 1) {
        p_result += sprintf(p_result, "%d%c", count, prev);
    } else {
        *p_result++ = prev;
    }

    *p_result = '\0';
    return result;
}


char *decode(char *input) {
    if (input == NULL || *input == '\0') {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = strlen(input);
    char *result = malloc(input_len * 2 * sizeof(char) + 1); // Allocate enough memory
    if (!result) return NULL;

    char *p_result = result;
    int count = 0;

    for (size_t i = 0; i < input_len; ++i) {
        if ('0' <= input[i] && input[i] <= '9') {
            count = count * 10 + (input[i] - '0');
        } else {
            int repeat = (count > 0) ? count : 1;
            for (int j = 0; j < repeat; ++j) {
                *p_result++ = input[i];
            }
            count = 0;
        }
    }

    *p_result = '\0';
    return result;
}