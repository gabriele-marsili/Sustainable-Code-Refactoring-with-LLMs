#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result = {0, NULL};
    
    if (substring_length == 0 || input_text == NULL) {
        return result;
    }
    
    size_t input_len = strlen(input_text);
    
    if (substring_length > input_len) {
        return result;
    }
    
    result.substring_count = input_len - substring_length + 1;
    
    result.substring = malloc(result.substring_count * sizeof(char *));
    if (result.substring == NULL) {
        result.substring_count = 0;
        return result;
    }
    
    size_t alloc_size = substring_length + 1;
    for (size_t i = 0; i < result.substring_count; i++) {
        result.substring[i] = malloc(alloc_size);
        if (result.substring[i] == NULL) {
            for (size_t j = 0; j < i; j++) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result;
        }
        
        memcpy(result.substring[i], input_text + i, substring_length);
        result.substring[i][substring_length] = '\0';
    }
    
    return result;
}