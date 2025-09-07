#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>

bool is_a_separator(char chr) {
    return (chr == ' ' || chr == '-');
}

bool is_a_letter(char chr) {
    return ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z'));
}

char *abbreviate(const char *phrase) {
    if (phrase == NULL) return NULL;

    size_t output_len = 0;
    const char *ptr = phrase;
    bool first_letter_flag = true;

    // First pass: Calculate output length
    while (*ptr) {
        if (is_a_separator(*ptr)) {
            first_letter_flag = true;
        } else if (first_letter_flag && is_a_letter(*ptr)) {
            output_len++;
            first_letter_flag = false;
        }
        ptr++;
    }

    if (output_len == 0) return NULL;

    // Allocate memory for the result
    char *result = malloc(output_len + 1);
    if (result == NULL) return NULL;

    // Second pass: Build the acronym
    char *res_ptr = result;
    first_letter_flag = true;
    while (*phrase) {
        if (is_a_separator(*phrase)) {
            first_letter_flag = true;
        } else if (first_letter_flag && is_a_letter(*phrase)) {
            *res_ptr++ = toupper(*phrase);
            first_letter_flag = false;
        }
        phrase++;
    }

    *res_ptr = '\0';
    return result;
}