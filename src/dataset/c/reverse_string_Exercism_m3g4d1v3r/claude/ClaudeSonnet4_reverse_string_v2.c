#include "reverse_string.h"

char *reverse(const char *value) {
    if (value == NULL) return NULL;
    
    size_t input_len = strlen(value);
    char *result = malloc(input_len + 1);
    
    if (result == NULL) return NULL;
    
    char *start = result;
    const char *end = value + input_len - 1;
    
    while (end >= value) {
        *start++ = *end--;
    }
    *start = '\0';
    
    return result;
}