#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result = {0, NULL};
    size_t input_len = strlen(input_text);

    if (substring_length == 0 || substring_length > input_len) return result;

    result.substring_count = input_len - substring_length + 1;
    result.substring = malloc(result.substring_count * sizeof(char *));
    if (result.substring == NULL) return result;

    for (size_t i = 0; i < result.substring_count; i++) {
        result.substring[i] = strndup(input_text + i, substring_length);
        if (result.substring[i] == NULL) {
            // Cleanup in case of allocation failure
            for (size_t j = 0; j < i; j++) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result;
        }
    }

    return result;
}