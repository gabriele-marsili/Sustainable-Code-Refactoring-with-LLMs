#include "run_length_encoding.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_LEN 255

char *encode(char *input) {
    if (input == NULL || *input == '\0') {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = strlen(input);
    char *result = malloc(MAX_LEN * sizeof(char));
    if (!result) return NULL;
    result[0] = '\0';

    char prev = input[0];
    int count = 1;
    size_t result_len = 0;

    for (size_t i = 1; i < input_len; ++i) {
        if (input[i] == prev) {
            count++;
        } else {
            int num_chars;
            if (count > 1) {
                num_chars = snprintf(result + result_len, MAX_LEN - result_len, "%d%c", count, prev);
            } else {
                num_chars = snprintf(result + result_len, MAX_LEN - result_len, "%c", prev);
            }

            if (num_chars < 0 || (size_t)num_chars >= MAX_LEN - result_len) {
                free(result);
                return NULL;
            }

            result_len += (size_t)num_chars;
            count = 1;
            prev = input[i];
        }
    }

    int num_chars;
    if (count > 1) {
        num_chars = snprintf(result + result_len, MAX_LEN - result_len, "%d%c", count, prev);
    } else {
        num_chars = snprintf(result + result_len, MAX_LEN - result_len, "%c", prev);
    }

    if (num_chars < 0 || (size_t)num_chars >= MAX_LEN - result_len) {
        free(result);
        return NULL;
    }

    result_len += (size_t)num_chars;
    result[result_len] = '\0';

    return result;
}


char *decode(char *input) {
    if (input == NULL) {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = strlen(input);
    char *result = malloc(MAX_LEN * sizeof(char));
    if (!result) return NULL;
    result[0] = '\0';

    size_t result_len = 0;
    int count = 0;

    for (size_t i = 0; i < input_len; ++i) {
        if (isdigit(input[i])) {
            count = count * 10 + (input[i] - '0');
        } else {
            int repeat = (count > 0) ? count : 1;
            if (result_len + repeat >= MAX_LEN) {
                free(result);
                return NULL;
            }

            memset(result + result_len, input[i], repeat);
            result_len += repeat;
            count = 0;
        }
    }

    result[result_len] = '\0';
    return result;
}