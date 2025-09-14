#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define NUMLEN 10
#define FORMATTED_LEN 14
#define AREA_CODE_LEN 3

static inline int is_allowed_char(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static inline void skip_spaces(const char **s) {
    while (**s == ' ') (*s)++;
}

static char *create_error_result(void) {
    char *res = malloc(NUMLEN + 1);
    if (!res) return NULL;
    memset(res, '0', NUMLEN);
    res[NUMLEN] = '\0';
    return res;
}

static int validate_and_extract_digits(const char *input, char *output) {
    const char *src = input;
    char *dst = output;
    int digit_count = 0;
    
    if (!input || !*input) return -1;
    
    skip_spaces(&src);
    
    // Handle country code
    if (*src == '+') {
        if (src[1] != '1' || src[2] != ' ') return -1;
        src += 3;
    }
    
    // Handle area code in parentheses
    if (*src == '(') {
        src++;
        for (int i = 0; i < 3; i++) {
            while (is_allowed_char(*src)) src++;
            if (!isdigit(*src)) return -1;
            *dst++ = *src++;
            digit_count++;
        }
        while (is_allowed_char(*src)) src++;
        if (*src != ')') return -1;
        src++;
    }
    
    skip_spaces(&src);
    
    // Skip leading '1' if present
    if (*src == '1' && digit_count == 0) {
        int temp_digits = 0;
        const char *temp_src = src + 1;
        while (*temp_src) {
            if (isdigit(*temp_src)) {
                temp_digits++;
                if (temp_digits > NUMLEN) break;
            } else if (!is_allowed_char(*temp_src)) {
                break;
            }
            temp_src++;
        }
        if (temp_digits == NUMLEN) src++;
    }
    
    // Extract remaining digits
    while (*src && digit_count < NUMLEN) {
        if (isdigit(*src)) {
            *dst++ = *src;
            digit_count++;
        } else if (!is_allowed_char(*src)) {
            return -1;
        }
        src++;
    }
    
    // Check for extra characters
    while (*src) {
        if (isdigit(*src)) return -1; // Too many digits
        if (!is_allowed_char(*src)) return -1; // Invalid character
        src++;
    }
    
    return (digit_count == NUMLEN) ? 0 : -1;
}

char *phone_number_clean(const char *input) {
    char *result = malloc(NUMLEN + 1);
    if (!result) return NULL;
    
    if (validate_and_extract_digits(input, result) < 0) {
        free(result);
        return create_error_result();
    }
    
    result[NUMLEN] = '\0';
    return result;
}

char *phone_number_get_area_code(const char *input) {
    char digits[NUMLEN + 1];
    
    if (validate_and_extract_digits(input, digits) < 0) {
        char *error_result = malloc(4);
        if (!error_result) return NULL;
        memcpy(error_result, "000", 4);
        return error_result;
    }
    
    char *result = malloc(4);
    if (!result) return NULL;
    
    memcpy(result, digits, AREA_CODE_LEN);
    result[AREA_CODE_LEN] = '\0';
    
    return result;
}

char *phone_number_format(const char *input) {
    char digits[NUMLEN + 1];
    
    if (validate_and_extract_digits(input, digits) < 0) {
        return create_error_result();
    }
    
    char *result = malloc(FORMATTED_LEN + 1);
    if (!result) return NULL;
    
    // Format: (xxx) xxx-xxxx
    result[0] = '(';
    memcpy(result + 1, digits, 3);
    result[4] = ')';
    result[5] = ' ';
    memcpy(result + 6, digits + 3, 3);
    result[9] = '-';
    memcpy(result + 10, digits + 6, 4);
    result[FORMATTED_LEN] = '\0';
    
    return result;
}