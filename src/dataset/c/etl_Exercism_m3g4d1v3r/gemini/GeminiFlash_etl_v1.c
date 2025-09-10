#include "etl.h"
#include <string.h>

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return 0;

    size_t output_len = 0;
    size_t value_map[ALPHABET_SIZE] = {0}; 

    for (size_t i = 0; i < input_len; ++i) {
        const char *key = input[i].keys;
        int value = input[i].value;

        while (*key) {
            char c = *key;
            size_t index;

            if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            } else if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else {
                key++;
                continue;
            }

            if (value_map[index] == 0) {
                value_map[index] = value;
                output_len++;
            }
            key++;
        }
    }

    *output = malloc(sizeof(new_map) * output_len);
    if (*output == NULL) return 0;

    size_t output_idx = 0;
    for (size_t i = 0; i < ALPHABET_SIZE; ++i) {
        if (value_map[i] != 0) {
            (*output)[output_idx].key = (char)(i + 'a');
            (*output)[output_idx].value = value_map[i];
            output_idx++;
        }
    }

    return (int)output_len;
}