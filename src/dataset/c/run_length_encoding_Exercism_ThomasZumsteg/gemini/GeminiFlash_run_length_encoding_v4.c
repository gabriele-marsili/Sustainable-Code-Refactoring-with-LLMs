#include "run_length_encoding.h"
#include <stdlib.h>
#include <stdio.h>

char *encode(char *input) {
    if (!input || *input == '\0') {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = 0;
    while (input[input_len] != '\0') {
        input_len++;
    }

    size_t result_len = 0;
    char *result = malloc(2 * input_len * sizeof(char) + 1); // Initial allocation, realloc if needed
    if (!result) return NULL;

    char prev = input[0];
    int count = 1;

    for (size_t i = 1; i <= input_len; ++i) {
        if (i < input_len && input[i] == prev) {
            count++;
        } else {
            int num_digits = 0;
            int temp_count = count;
            if (count > 1) {
                while (temp_count > 0) {
                    temp_count /= 10;
                    num_digits++;
                }
            }

            size_t needed_space = (count > 1 ? num_digits + 1 : 1);

            if (result_len + needed_space > 2 * input_len) {
                size_t new_size = result_len + needed_space + input_len;
                char *temp_result = realloc(result, new_size * sizeof(char));
                if (!temp_result) {
                    free(result);
                    return NULL;
                }
                result = temp_result;
            }

            if (count > 1) {
                result_len += sprintf(result + result_len, "%d%c", count, prev);
            } else {
                result[result_len++] = prev;
            }

            if (i < input_len) {
                prev = input[i];
                count = 1;
            }
        }
    }

    result[result_len] = '\0';
    return result;
}

char *decode(char *input) {
    if (!input || *input == '\0') {
        char *empty = calloc(1, sizeof(char));
        return empty;
    }

    size_t input_len = 0;
    while (input[input_len] != '\0') {
        input_len++;
    }

    size_t result_len = 0;
    size_t result_capacity = input_len * 2;
    char *result = malloc(result_capacity * sizeof(char));
    if (!result) return NULL;

    int count = 0;
    for (size_t i = 0; i < input_len; ++i) {
        if ('0' <= input[i] && input[i] <= '9') {
            count = count * 10 + (input[i] - '0');
        } else {
            int repeat_count = (count > 0) ? count : 1;
            if (result_len + repeat_count > result_capacity) {
                size_t new_capacity = result_capacity + repeat_count + input_len;
                char *temp_result = realloc(result, new_capacity * sizeof(char));
                if (!temp_result) {
                    free(result);
                    return NULL;
                }
                result = temp_result;
                result_capacity = new_capacity;
            }

            for (int j = 0; j < repeat_count; ++j) {
                result[result_len++] = input[i];
            }
            count = 0;
        }
    }

    result[result_len] = '\0';
    return result;
}