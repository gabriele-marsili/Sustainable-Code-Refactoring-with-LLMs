#include "acronym.h"

bool is_a_separator(char chr) {
    if (chr == ' ' || chr == '-') return (true);
    return (false);
}

bool is_a_letter(char chr) {
    if (chr >= 'a' && chr <= 'z') return (true);
    if (chr >= 'A' && chr <= 'Z') return (true);
    return (false);
}

char *abbreviate(const char *phrase) {
    bool first_letter_flag;
    size_t output_len, input_len;
    char *result;

    output_len = 0;
    input_len = 0;
    if (phrase == NULL) return (NULL);
    first_letter_flag = true;
    while (*phrase != '\0') {
        if (is_a_separator(*phrase) == true) {
            first_letter_flag = true;
        } else if (first_letter_flag == true) {
            if (is_a_letter(*phrase) == true) {
                output_len++;
                first_letter_flag = false;
            }
        }
        phrase++;
        input_len++;
    }
    if (output_len == 0) return (NULL);
    result = malloc(sizeof(char) * (output_len + 1));
    if (result == NULL) return (NULL);
    phrase -= input_len;
    first_letter_flag = true;
    while (*phrase != '\0') {
        if (is_a_separator(*phrase) == true) {
            first_letter_flag = true;
        } else if (first_letter_flag == true) {
            if (is_a_letter(*phrase) == true) {
                *result++ = toupper(*phrase);
                first_letter_flag = false;
            }
        }
        phrase++;
    }
    *result = '\0';
    return (result - output_len);
}
