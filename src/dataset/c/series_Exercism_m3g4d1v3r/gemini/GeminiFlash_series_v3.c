#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    size_t input_len, output_idx;

    input_len = strlen(input_text);
    result.substring_count = 0;
    result.substring = NULL;

    if (substring_length == 0 || substring_length > input_len) return (result);

    result.substring_count = input_len - substring_length + 1;
    if (result.substring_count <= 0) return (result);

    result.substring = malloc(sizeof(char *) * result.substring_count);
    if (result.substring == NULL) return (result);

    output_idx = 0;
    for (size_t idx_i = 0; idx_i < result.substring_count; idx_i++) {
        result.substring[output_idx] = malloc(sizeof(char) * (substring_length + 1));
        if (result.substring[output_idx] == NULL) {
            // Handle allocation failure: free previously allocated memory
            for (size_t k = 0; k < output_idx; k++) {
                free(result.substring[k]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result;
        }
        strncpy(result.substring[output_idx], input_text + idx_i, substring_length);
        result.substring[output_idx][substring_length] = '\0';
        output_idx++;
    }
    return (result);
}