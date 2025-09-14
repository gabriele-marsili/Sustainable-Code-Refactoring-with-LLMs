#include "etl.h"
#include <string.h>

static size_t auxiliar_array[ALPHABET_SIZE];

static inline void empty_auxiliar_array(void) {
    memset(auxiliar_array, 0, sizeof(auxiliar_array));
}

int convert(const legacy_map *input, const size_t input_len, new_map **output) {
    if (!input || !output) return 0;
    
    empty_auxiliar_array();
    size_t output_len = 0;
    
    for (size_t idx = 0; idx < input_len; idx++) {
        const char *key = input[idx].keys;
        const int value = input[idx].value;
        
        for (const char *p = key; *p; p++) {
            size_t char_idx;
            if (*p >= 'a' && *p <= 'z') {
                char_idx = *p - 'a';
            } else if (*p >= 'A' && *p <= 'Z') {
                char_idx = *p - 'A';
            } else {
                continue;
            }
            
            if (auxiliar_array[char_idx] == 0) {
                output_len++;
            }
            auxiliar_array[char_idx] = value;
        }
    }
    
    *output = malloc(sizeof(new_map) * output_len);
    if (!*output) return 0;
    
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