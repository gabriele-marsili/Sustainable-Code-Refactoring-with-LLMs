#include "reverse_string.h"

char *reverse(const char *value) {
    char *result;
    size_t input_len;

    if (value == NULL) return (NULL);
    input_len = strlen(value);
    result = malloc(sizeof(char) * (input_len + 1));
    for (int idx = input_len - 1; idx >= 0; idx--) {
        *result++ = value[idx];
    }
    *result++ = '\0';
    result -= (input_len + 1);
    return (result);
}
