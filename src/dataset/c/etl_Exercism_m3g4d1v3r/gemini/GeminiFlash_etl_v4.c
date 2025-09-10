#include "etl.h"
#include <string.h>

void empty_auxiliar_array() {
    memset(auxiliar_array, 0, sizeof(auxiliar_array));
}

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return (0);

    empty_auxiliar_array();

    size_t output_len = 0;
    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        int value = input[idx].value;
        while (*key != '\0') {
            unsigned char c = (unsigned char)*key;
            size_t index;
            if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            } else if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else {
                key++;
                continue;
            }
            if (auxiliar_array[index] == 0) {
                output_len++;
            }
            auxiliar_array[index] = value;
            key++;
        }
    }

    *output = malloc(sizeof(new_map) * output_len);
    if (*output == NULL && output_len > 0) return 0;

    size_t output_idx = 0;
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (auxiliar_array[idx] != 0) {
            (*output)[output_idx].key = (char)(idx + 'a');
            (*output)[output_idx].value = auxiliar_array[idx];
            output_idx++;
        }
    }

    return (output_len);
}