#include "series.h"
#include <string.h>
#include <stdlib.h>

slices_t slices(char *input_text, unsigned int substring_length)
{
    slices_t result = {0};
    size_t input_length = strlen(input_text);

    if (substring_length == 0 || substring_length > input_length)
        return result;

    result.substring_count = input_length - substring_length + 1;
    result.substring = calloc(result.substring_count, sizeof(char*));

    for (unsigned int i = 0; i < result.substring_count; i++)
    {
        result.substring[i] = strndup(input_text + i, substring_length);
    }

    return result;
}