#include "series.h"
#include <string.h>
#include <stdlib.h>

slices_t slices(char *input_text, unsigned int substring_length) {
    slices_t result;
    result.substring = calloc(MAX_SERIES_RESULTS, sizeof(char*));
    result.substring_count = 0;

    size_t input_length = strlen(input_text);

    if (substring_length == 0 || substring_length > input_length) {
        return result;
    }

    if (substring_length == input_length) {
        result.substring[0] = calloc(input_length + 1, sizeof(char));
        if (result.substring[0] != NULL) {
            strcpy(result.substring[0], input_text);
            result.substring_count = 1;
        }
        return result;
    }

    unsigned int max_slices = input_length - substring_length + 1;
    if (max_slices > MAX_SERIES_RESULTS) {
        max_slices = MAX_SERIES_RESULTS;
    }

    for (unsigned int i = 0; i < max_slices; i++) {
        result.substring[i] = calloc(substring_length + 1, sizeof(char));
        if (result.substring[i] != NULL) {
            strncpy(result.substring[i], input_text + i, substring_length);
            result.substring[i][substring_length] = '\0';
            result.substring_count++;
        } else {
            // Handle allocation failure: free previously allocated memory
            for (unsigned int j = 0; j < i; j++) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result; // Or handle the error in another appropriate way
        }
    }

    return result;
}