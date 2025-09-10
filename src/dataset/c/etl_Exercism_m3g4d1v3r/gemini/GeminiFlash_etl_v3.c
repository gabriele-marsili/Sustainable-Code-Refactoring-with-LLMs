#include "etl.h"
#include <string.h>

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return (0);

    size_t output_len = 0;
    size_t auxiliar_array[ALPHABET_SIZE] = {0};
    const char *key;
    int value;

    for (size_t idx = 0; idx < input_len; idx++) {
        key = input[idx].keys;
        value = input[idx].value;
        while (*key != '\0') {
            if (*key >= 'a' && *key <= 'z') {
                if (auxiliar_array[*key - 'a'] == 0) {
                    output_len++;
                }
                auxiliar_array[*key - 'a'] = value;
            } else if (*key >= 'A' && *key <= 'Z') {
                if (auxiliar_array[*key - 'A'] == 0) {
                    output_len++;
                }
                auxiliar_array[*key - 'A'] = value;
            }
            key++;
        }
    }

    *output = malloc(sizeof(new_map) * output_len);
    if (*output == NULL && output_len > 0) return 0;

    size_t output_idx = 0;
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (auxiliar_array[idx] != 0) {
            (*output)[output_idx].key = idx + 'a';
            (*output)[output_idx].value = auxiliar_array[idx];
            output_idx++;
        }
    }

    return (output_len);
}