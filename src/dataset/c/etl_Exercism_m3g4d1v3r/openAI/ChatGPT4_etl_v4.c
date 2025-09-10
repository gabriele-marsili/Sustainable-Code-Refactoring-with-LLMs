#include "etl.h"

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return 0;

    size_t output_len = 0;
    size_t auxiliar_array[ALPHABET_SIZE] = {0};

    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        int value = input[idx].value;
        while (*key) {
            char normalized = (*key >= 'A' && *key <= 'Z') ? *key + ('a' - 'A') : *key;
            if (normalized >= 'a' && normalized <= 'z') {
                if (auxiliar_array[normalized - 'a'] == 0) output_len++;
                auxiliar_array[normalized - 'a'] = value;
            }
            key++;
        }
    }

    *output = malloc(sizeof(new_map) * output_len);
    if (!*output) return 0;

    size_t output_idx = 0;
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (auxiliar_array[idx]) {
            (*output)[output_idx].key = idx + 'a';
            (*output)[output_idx++].value = auxiliar_array[idx];
        }
    }

    return output_len;
}