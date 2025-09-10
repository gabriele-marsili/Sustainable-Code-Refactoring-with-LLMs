#include "series.h"
#include <string.h>

slices_t slices(char *input_text, unsigned int substring_length)
{
    slices_t result = {0};
    size_t input_length = strlen(input_text);

    if (substring_length == 0 || substring_length > input_length)
    {
        return result;
    }

    result.substring = calloc(MAX_SERIES_RESULTS, sizeof(char *));
    if (!result.substring)
    {
        return result;
    }

    for (unsigned int i = 0; i <= input_length - substring_length; i++)
    {
        result.substring[result.substring_count] = strndup(input_text + i, substring_length);
        if (!result.substring[result.substring_count])
        {
            break;
        }
        result.substring_count++;
    }

    return result;
}