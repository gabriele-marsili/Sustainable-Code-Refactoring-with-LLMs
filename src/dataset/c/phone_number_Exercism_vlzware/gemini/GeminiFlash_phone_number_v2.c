#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define NUMLEN 10

static bool is_allowed(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static void consume_non_digits(const char **s) {
    while (**s && !isdigit(**s)) {
        (*s)++;
    }
}

char *phone_number_clean(const char *input) {
    if (!input) {
        return NULL;
    }

    size_t input_len = strlen(input);
    if (input_len == 0) {
        return NULL;
    }

    char *result = (char *)malloc(NUMLEN + 1);
    if (!result) {
        return NULL;
    }

    char *result_ptr = result;
    const char *input_ptr = input;
    int digit_count = 0;

    // Skip leading whitespace
    while (isspace(*input_ptr)) {
        input_ptr++;
    }

    // Handle '+1' country code
    if (*input_ptr == '+') {
        if (input_len >= 2 && input[1] == '1') {
            input_ptr += 2;
            while (isspace(*input_ptr)) {
                input_ptr++;
            }
        } else {
            free(result);
            return NULL;
        }
    }

    // Extract digits
    while (*input_ptr) {
        if (isdigit(*input_ptr)) {
            if (digit_count >= NUMLEN) {
                free(result);
                return NULL;
            }
            *result_ptr++ = *input_ptr;
            digit_count++;
        } else if (!is_allowed(*input_ptr)) {
            free(result);
            return NULL;
        }
        input_ptr++;
    }

    *result_ptr = '\0';

    if (digit_count != NUMLEN) {
        free(result);
        return NULL;
    }

    return result;
}

char *phone_number_get_area_code(const char *number) {
    char *cleaned_number = phone_number_clean(number);
    if (!cleaned_number) {
        return NULL;
    }

    char *area_code = (char *)malloc(4);
    if (!area_code) {
        free(cleaned_number);
        return NULL;
    }

    strncpy(area_code, cleaned_number, 3);
    area_code[3] = '\0';

    free(cleaned_number);
    return area_code;
}

char *phone_number_format(const char *number) {
    char *cleaned_number = phone_number_clean(number);
    if (!cleaned_number) {
        return NULL;
    }

    char *formatted_number = (char *)malloc(15);
    if (!formatted_number) {
        free(cleaned_number);
        return NULL;
    }

    snprintf(formatted_number, 15, "(%c%c%c) %c%c%c-%c%c%c%c",
             cleaned_number[0], cleaned_number[1], cleaned_number[2],
             cleaned_number[3], cleaned_number[4], cleaned_number[5],
             cleaned_number[6], cleaned_number[7], cleaned_number[8], cleaned_number[9]);

    free(cleaned_number);
    return formatted_number;
}