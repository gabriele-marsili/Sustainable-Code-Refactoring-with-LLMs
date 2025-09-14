#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    size_t input_len;

    input_len = strlen(input_text);
    result.substring_count = 0;
    result.substring = NULL;
    
    if (substring_length == 0 || substring_length > input_len) {
        return result;
    }
    
    result.substring_count = input_len - substring_length + 1;
    result.substring = malloc(sizeof(char *) * result.substring_count);
    if (result.substring == NULL) {
        result.substring_count = 0;
        return result;
    }
    
    for (size_t i = 0; i < result.substring_count; i++) {
        result.substring[i] = malloc(sizeof(char) * (substring_length + 1));
        if (result.substring[i] == NULL) {
            // Clean up previously allocated memory
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