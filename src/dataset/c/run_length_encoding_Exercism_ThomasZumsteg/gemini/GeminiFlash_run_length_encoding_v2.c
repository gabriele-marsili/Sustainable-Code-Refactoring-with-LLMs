#include "run_length_encoding.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *encode(char *input) {
    if (input == NULL || *input == '\0') {
        char *result = calloc(1, sizeof(char));
        if (result == NULL) return NULL;
        result[0] = '\0';
        return result;
    }

    size_t input_len = strlen(input);
    size_t result_len = 0;
    char *result = malloc(2 * input_len * sizeof(char) + 1);
    if (result == NULL) return NULL;
    result[0] = '\0';

    char prev = input[0];
    int count = 1;

    for (size_t i = 1; i < input_len; i++) {
        if (input[i] == prev) {
            count++;
        } else {
            if (count > 1) {
                int num_digits = snprintf(NULL, 0, "%d", count);
                result = realloc(result, (result_len + num_digits + 1 + 1) * sizeof(char));
                if (result == NULL) return NULL;
                sprintf(result + result_len, "%d%c", count, prev);
                result_len += num_digits + 1;
            } else {
                result = realloc(result, (result_len + 1 + 1) * sizeof(char));
                if (result == NULL) return NULL;
                result[result_len++] = prev;
                result[result_len] = '\0';
            }
            prev = input[i];
            count = 1;
        }
    }

    if (count > 1) {
        int num_digits = snprintf(NULL, 0, "%d", count);
        result = realloc(result, (result_len + num_digits + 1 + 1) * sizeof(char));
        if (result == NULL) return NULL;
        sprintf(result + result_len, "%d%c", count, prev);
        result_len += num_digits + 1;
    } else {
        result = realloc(result, (result_len + 1 + 1) * sizeof(char));
        if (result == NULL) return NULL;
        result[result_len++] = prev;
        result[result_len] = '\0';
    }

    return result;
}

char *decode(char *input) {
    if (input == NULL || *input == '\0') {
        char *result = calloc(1, sizeof(char));
        if (result == NULL) return NULL;
        result[0] = '\0';
        return result;
    }

    size_t input_len = strlen(input);
    size_t result_len = 0;
    char *result = malloc(input_len * sizeof(char) + 1);
    if (result == NULL) return NULL;
    result[0] = '\0';

    int count = 0;
    char *p_result = result;

    for (size_t i = 0; i < input_len; i++) {
        if ('0' <= input[i] && input[i] <= '9') {
            count = count * 10 + (input[i] - '0');
        } else {
            int repeat = (count > 0) ? count : 1;
            result = realloc(result, (result_len + repeat + 1) * sizeof(char));
            if (result == NULL) return NULL;

            for (int j = 0; j < repeat; j++) {
                result[result_len++] = input[i];
            }
            result[result_len] = '\0';
            count = 0;
        }
    }

    return result;
}