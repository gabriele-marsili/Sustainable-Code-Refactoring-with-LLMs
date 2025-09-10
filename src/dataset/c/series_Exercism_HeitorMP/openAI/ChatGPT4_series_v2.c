#include "series.h"
#include <string.h>
#include <stdlib.h>

slices_t slices(char *input_text, unsigned int substring_length)
{
    slices_t result;
    result.substring = NULL;
    result.substring_count = 0;

    if (substring_length == 0 || substring_length > strlen(input_text))
    {
        return result;
    }

    unsigned int input_length = strlen(input_text);
    unsigned int slice_count = input_length - substring_length + 1;

    result.substring = calloc(slice_count, sizeof(char *));
    if (!result.substring)
    {
        return result;
    }

    for (unsigned int i = 0; i < slice_count; i++)
    {
        result.substring[i] = strndup(input_text + i, substring_length);
        if (!result.substring[i])
        {
            for (unsigned int j = 0; j < i; j++)
            {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substring_count = 0;
            return result;
        }
        result.substring_count++;
    }

    return result;
}