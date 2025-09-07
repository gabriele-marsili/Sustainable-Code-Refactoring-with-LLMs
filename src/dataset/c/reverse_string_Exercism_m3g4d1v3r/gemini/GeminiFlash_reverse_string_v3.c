#include "reverse_string.h"

char *reverse(const char *value) {
    if (value == NULL) return NULL;

    size_t input_len = strlen(value);
    char *result = malloc(input_len + 1);

    if (result == NULL) return NULL;

    for (size_t i = 0; i < input_len; ++i) {
        result[i] = value[input_len - 1 - i];
    }
    result[input_len] = '\0';

    return result;
}