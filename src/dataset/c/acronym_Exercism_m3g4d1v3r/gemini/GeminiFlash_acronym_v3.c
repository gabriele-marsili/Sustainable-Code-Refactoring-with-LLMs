#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

bool is_a_separator(char chr) {
    return (chr == ' ' || chr == '-');
}

bool is_a_letter(char chr) {
    return ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z'));
}

char *abbreviate(const char *phrase) {
    if (phrase == NULL) return NULL;

    size_t output_len = 0;
    bool first_letter_flag = true;
    const char *p = phrase;

    while (*p != '\0') {
        if (is_a_separator(*p)) {
            first_letter_flag = true;
        } else if (first_letter_flag && is_a_letter(*p)) {
            output_len++;
            first_letter_flag = false;
        }
        p++;
    }

    if (output_len == 0) return NULL;

    char *result = malloc(sizeof(char) * (output_len + 1));
    if (result == NULL) return NULL;

    char *r = result;
    first_letter_flag = true;
    p = phrase;

    while (*p != '\0') {
        if (is_a_separator(*p)) {
            first_letter_flag = true;
        } else if (first_letter_flag && is_a_letter(*p)) {
            *r++ = toupper((unsigned char)*p);
            first_letter_flag = false;
        }
        p++;
    }

    *r = '\0';
    return result;
}