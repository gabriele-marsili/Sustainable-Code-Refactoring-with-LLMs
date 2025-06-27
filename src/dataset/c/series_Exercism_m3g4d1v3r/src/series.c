#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    size_t input_len, output_idx;

    input_len = strlen(input_text);
    result.substring_count = 0;
    result.substring = NULL;
    if (substring_length == 0) return (result);
    for (size_t idx = 0; idx < input_len; idx++) {
        if ((idx + substring_length) > input_len) break;
        result.substring_count++;
    }
    if (result.substring_count == 0) return (result);
    result.substring = malloc(sizeof(char **) * result.substring_count);
    if (result.substring == NULL) return (result);
    output_idx = 0;
    for (size_t idx_i = 0; idx_i < input_len; idx_i++) {
        if ((idx_i + substring_length) > input_len) break;
        result.substring[output_idx] =
            malloc(sizeof(char *) * (substring_length + 1));
        for (size_t idx_j = 0; idx_j < substring_length; idx_j++) {
            result.substring[output_idx][idx_j] = input_text[idx_i + idx_j];
        }
        result.substring[output_idx][substring_length] = '\0';
        output_idx++;
    }
    return (result);
}
