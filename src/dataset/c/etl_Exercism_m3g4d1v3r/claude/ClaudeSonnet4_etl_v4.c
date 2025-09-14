#include "etl.h"
#include <string.h>

static size_t auxiliar_array[ALPHABET_SIZE];

static inline void empty_auxiliar_array(void) {
    memset(auxiliar_array, 0, sizeof(auxiliar_array));
}

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (input == NULL || output == NULL) return 0;
    
    empty_auxiliar_array();
    size_t output_len = 0;
    
    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        const int value = input[idx].value;
        
        for (const char *p = key; *p; p++) {
            const char c = *p;
            size_t index;
            
            if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            } else if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else {
                continue;
            }
            
            if (auxiliar_array[index] == 0) {
                output_len++;
            }
            auxiliar_array[index] = value;
        }
    }
    
    *output = malloc(sizeof(new_map) * output_len);
    if (*output == NULL) return 0;
    
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