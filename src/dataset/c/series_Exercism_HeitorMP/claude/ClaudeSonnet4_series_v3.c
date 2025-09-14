#include "series.h"

slices_t slices(char *input_text, unsigned int substring_length)
{
    slices_t result;
    result.substring = calloc(sizeof(char**), MAX_SERIES_RESULTS);
    result.substring_count = 0;

    if (substring_length == 0)
    {
        result.substring[0] = NULL;
        return result;
    }

    size_t input_length = strlen(input_text);
    
    if (substring_length > input_length)
    {
        result.substring[0] = NULL;
        return result;
    }

    if (substring_length == input_length)
    {
        result.substring[0] = calloc(input_length + 1, sizeof(char));
        strcpy(result.substring[0], input_text);
        result.substring_count = 1;
        return result;
    }

    size_t slice_count = input_length - substring_length + 1;
    for (size_t i = 0; i < slice_count; i++)
    {
        result.substring[i] = calloc(substring_length + 1, sizeof(char));
        strncpy(result.substring[i], input_text + i, substring_length);
        result.substring_count++;
    }
    
    return result;
}