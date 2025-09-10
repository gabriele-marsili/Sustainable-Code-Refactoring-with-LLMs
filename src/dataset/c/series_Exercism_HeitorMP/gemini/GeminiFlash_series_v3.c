#include "series.h"
#include <string.h>
#include <stdlib.h>

slices_t slices(char *input_text, unsigned int substring_length)
{
    slices_t result;
    result.substring_count = 0;

    size_t input_length = strlen(input_text);

    if (substring_length == 0 || substring_length > input_length)
    {
        result.substring = calloc(1, sizeof(char**));
        if (result.substring == NULL) {
            result.substring_count = 0;
            return result;
        }
        result.substring[0] = NULL;
        return result;
    }

    unsigned int num_substrings = input_length - substring_length + 1;

    if (num_substrings > MAX_SERIES_RESULTS) {
        num_substrings = MAX_SERIES_RESULTS;
    }

    result.substring = calloc(num_substrings, sizeof(char*));
    if (result.substring == NULL) {
        result.substring_count = 0;
        return result;
    }

    if (substring_length == input_length)
    {
        result.substring[0] = calloc(substring_length + 1, sizeof(char));
        if (result.substring[0] == NULL) {
            free(result.substring);
            result.substring_count = 0;
            return result;
        }
        strncpy(result.substring[0], input_text, substring_length);
        result.substring[0][substring_length] = '\0';
        result.substring_count = 1;
        return result;
    }

    for (unsigned int i = 0; i < num_substrings; i++)
    {
        result.substring[i] = calloc(substring_length + 1, sizeof(char));
        if (result.substring[i] == NULL) {
            for (unsigned int j = 0; j < i; j++) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring_count = 0;
            return result;
        }
        strncpy(result.substring[i], input_text + i, substring_length);
        result.substring[i][substring_length] = '\0';
        result.substring_count++;
    }
    return result;
}