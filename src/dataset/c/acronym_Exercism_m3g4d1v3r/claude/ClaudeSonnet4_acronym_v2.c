#include "acronym.h"

char *abbreviate(const char *phrase) {
    if (phrase == NULL) return NULL;
    
    // Count letters needed for acronym in single pass
    size_t output_len = 0;
    bool first_letter_flag = true;
    const char *p = phrase;
    
    while (*p) {
        char c = *p++;
        if (c == ' ' || c == '-') {
            first_letter_flag = true;
        } else if (first_letter_flag && ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))) {
            output_len++;
            first_letter_flag = false;
        }
    }
    
    if (output_len == 0) return NULL;
    
    char *result = malloc(output_len + 1);
    if (result == NULL) return NULL;
    
    // Build acronym in second pass
    char *out = result;
    first_letter_flag = true;
    p = phrase;
    
    while (*p) {
        char c = *p++;
        if (c == ' ' || c == '-') {
            first_letter_flag = true;
        } else if (first_letter_flag && ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))) {
            *out++ = (c >= 'a' && c <= 'z') ? c - 32 : c;
            first_letter_flag = false;
        }
    }
    
    *out = '\0';
    return result;
}