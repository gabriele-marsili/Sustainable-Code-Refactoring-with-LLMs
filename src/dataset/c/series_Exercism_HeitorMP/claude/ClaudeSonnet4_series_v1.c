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

    unsigned int input_length = strlen(input_text);
    
    if (substring_length == input_length)
    {
        result.substring[0] = malloc(input_length + 1);
        memcpy(result.substring[0], input_text, input_length);
        result.substring[0][input_length] = '\0';
        result.substring_count = 1;
        return result;
    }

    if (substring_length > input_length)
    {
        return result;
    }

    unsigned int slice_count = input_length - substring_length + 1;
    for (unsigned int i = 0; i < slice_count; i++)
    {
        result.substring[i] = malloc(substring_length + 1);
        memcpy(result.substring[i], input_text + i, substring_length);
        result.substring[i][substring_length] = '\0';
        result.substring_count++;
    }
    
    return result;
}