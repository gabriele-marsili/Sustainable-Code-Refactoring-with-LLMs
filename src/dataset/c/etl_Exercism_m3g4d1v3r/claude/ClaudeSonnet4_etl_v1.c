#include "etl.h"

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return 0;
    
    size_t auxiliar_array[ALPHABET_SIZE] = {0};
    size_t output_len = 0;
    
    // Single pass to populate auxiliary array and count output length
    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        int value = input[idx].value;
        
        while (*key != '\0') {
            size_t char_idx;
            if (*key >= 'a' && *key <= 'z') {
                char_idx = *key - 'a';
            } else if (*key >= 'A' && *key <= 'Z') {
                char_idx = *key - 'A';
            } else {
                key++;
                continue;
            }
            
            if (auxiliar_array[char_idx] == 0) {
                output_len++;
            }
            auxiliar_array[char_idx] = value;
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