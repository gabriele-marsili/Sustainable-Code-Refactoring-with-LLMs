#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    size_t input_len, output_idx;

    input_len = strlen(input_text);

    // Early exit for invalid substring length
    if (substring_length == 0 || substring_length > input_len) {
        result.substring_count = 0;
        result.substring = NULL;
        return result;
    }

    result.substring_count = input_len - substring_length + 1;

    // Early exit if no substrings can be created
    if (result.substring_count <= 0) {
        result.substring_count = 0;
        result.substring = NULL;
        return result;
    }

    result.substring = malloc(sizeof(char *) * result.substring_count);
    if (result.substring == NULL) {
        result.substring_count = 0;
        return result; // or handle error appropriately
    }

    output_idx = 0;
    for (size_t i = 0; i < result.substring_count; ++i) {
        result.substring[i] = malloc(sizeof(char) * (substring_length + 1));
        if (result.substring[i] == NULL) {
            // Handle allocation failure: free previously allocated substrings
            for (size_t j = 0; j < i; ++j) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result; // or handle error appropriately
        }
        strncpy(result.substring[i], input_text + i, substring_length);
        result.substring[i][substring_length] = '\0';
    }

    return result;
}