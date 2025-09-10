#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    size_t input_len;
    unsigned int substring_count;

    input_len = strlen(input_text);

    if (substring_length == 0 || substring_length > input_len) {
        result.substring_count = 0;
        result.substring = NULL;
        return result;
    }

    substring_count = (unsigned int)(input_len - substring_length + 1);
    
    result.substring_count = substring_count;
    result.substring = malloc(sizeof(char*) * substring_count);

    if (result.substring == NULL) {
        result.substring_count = 0;
        return result;
    }

    for (unsigned int i = 0; i < substring_count; ++i) {
        result.substring[i] = malloc(substring_length + 1);
        if (result.substring[i] == NULL) {
            // Handle allocation failure: free previously allocated substrings
            for (unsigned int j = 0; j < i; ++j) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result;
        }
        strncpy(result.substring[i], input_text + i, substring_length);
        result.substring[i][substring_length] = '\0';
    }

    return result;
}