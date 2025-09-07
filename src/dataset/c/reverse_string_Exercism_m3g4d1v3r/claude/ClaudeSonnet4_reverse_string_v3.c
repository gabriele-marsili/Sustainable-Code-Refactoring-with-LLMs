#include "reverse_string.h"

char *reverse(const char *value) {
    if (value == NULL) return NULL;
    
    size_t input_len = strlen(value);
    char *result = malloc(input_len + 1);
    if (result == NULL) return NULL;
    
    char *start = result;
    char *end = result + input_len - 1;
    
    while (start < end) {
        *start = value[input_len - 1 - (start - result)];
        *end = value[input_len - 1 - (end - result)];
        start++;
        end--;
    }
    
    if (start == end) {
        *start = value[input_len - 1 - (start - result)];
    }
    
    result[input_len] = '\0';
    return result;
}