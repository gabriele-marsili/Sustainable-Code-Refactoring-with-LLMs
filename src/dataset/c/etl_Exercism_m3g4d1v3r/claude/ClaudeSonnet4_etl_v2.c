#include "etl.h"

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return 0;
    
    size_t auxiliar_array[ALPHABET_SIZE] = {0};
    size_t output_len = 0;
    
    // Count valid characters and populate auxiliary array
    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        int value = input[idx].value;
        
        while (*key != '\0') {
            char c = *key;
            if (c >= 'A' && c <= 'Z') {
                size_t index = c - 'A';
                if (auxiliar_array[index] == 0) output_len++;
                auxiliar_array[index] = value;
            } else if (c >= 'a' && c <= 'z') {
                size_t index = c - 'a';
                if (auxiliar_array[index] == 0) output_len++;
                auxiliar_array[index] = value;
            }
            key++;
        }
    }
    
    *output = malloc(sizeof(new_map) * output_len);
    size_t output_idx = 0;
    
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (auxiliar_array[idx] != 0) {
            (*output)[output_idx].key = idx + 'a';
            (*output)[output_idx].value = auxiliar_array[idx];
            output_idx++;
        }
    }
    
    return output_len;
}