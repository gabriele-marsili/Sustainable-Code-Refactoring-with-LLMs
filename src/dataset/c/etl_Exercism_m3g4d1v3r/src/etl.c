#include "etl.h"

size_t auxiliar_array[ALPHABET_SIZE];

void empty_auxiliar_array() {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        auxiliar_array[idx] = 0;
    }
}

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    const char *key;
    size_t output_len, output_idx;
    int value;

    if (input == NULL || output == NULL) return (0);
    empty_auxiliar_array();
    output_len = 0;
    for (size_t idx = 0; idx < input_len; idx++) {
        key = input[idx].keys;
        value = input[idx].value;
        while (*key != '\0') {
            if (*key >= 'a' && *key <= 'z') {
                auxiliar_array[*key - 'a'] = value;
                output_len++;
            } else if (*key >= 'A' && *key <= 'Z') {
                auxiliar_array[*key - 'A'] = value;
                output_len++;
            }
            key++;
        }
    }
    *output = malloc(sizeof(new_map) * output_len);
    output_idx = 0;
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (auxiliar_array[idx] == 0) continue;
        (*output)[output_idx].key = idx + 'a';
        (*output)[output_idx++].value = auxiliar_array[idx];
    }
    return (output_len);
}
