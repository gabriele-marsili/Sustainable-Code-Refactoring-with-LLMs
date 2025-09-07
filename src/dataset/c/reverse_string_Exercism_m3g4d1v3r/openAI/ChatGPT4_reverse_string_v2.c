#include "reverse_string.h"

char *reverse(const char *value) {
    if (value == NULL) return NULL;

    size_t input_len = strlen(value);
    char *result = malloc(input_len + 1);
    if (result == NULL) return NULL;

    for (size_t idx = 0; idx < input_len; idx++) {
        result[idx] = value[input_len - idx - 1];
    }
    result[input_len] = '\0';

    return result;
}