#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define NUMLEN 10

static bool is_allowed(char c);
static void consume_non_digits(const char **s);
static bool parse_number(const char *input, char *output);

char *phone_number_clean(const char *input) {
    if (input == NULL || *input == '\0') {
        return NULL;
    }

    char *result = (char *)malloc(NUMLEN + 1);
    if (result == NULL) {
        return NULL;
    }

    if (!parse_number(input, result)) {
        free(result);
        return NULL;
    }

    return result;
}

char *phone_number_get_area_code(const char *input) {
    char *cleaned_number = phone_number_clean(input);
    if (cleaned_number == NULL) {
        return NULL;
    }

    char *area_code = (char *)malloc(4);
    if (area_code == NULL) {
        free(cleaned_number);
        return NULL;
    }

    strncpy(area_code, cleaned_number, 3);
    area_code[3] = '\0';

    free(cleaned_number);
    return area_code;
}

char *phone_number_format(const char *input) {
    char *cleaned_number = phone_number_clean(input);
    if (cleaned_number == NULL) {
        return NULL;
    }

    if (cleaned_number[0] == '0') {
        return cleaned_number;
    }

    char *formatted_number = (char *)malloc(15);
    if (formatted_number == NULL) {
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

static bool parse_number(const char *input, char *output) {
    const char *src = input;
    char *dst = output;
    int digits_found = 0;

    consume_non_digits(&src);

    if (*src == '+') {
        if (strncmp(src + 1, "1 ", 2) != 0) {
            memset(output, '0', NUMLEN);
            output[NUMLEN] = '\0';
            return false;
        }
        src += 3;
        consume_non_digits(&src);
    }

    if (*src == '(') {
        src++;
        for (int i = 0; i < 3; ++i) {
            consume_non_digits(&src);
            if (!isdigit(*src)) {
                memset(output, '0', NUMLEN);
                output[NUMLEN] = '\0';
                return false;
            }
            *dst++ = *src++;
            digits_found++;
        }
        consume_non_digits(&src);
        if (*src != ')') {
            memset(output, '0', NUMLEN);
            output[NUMLEN] = '\0';
            return false;
        }
        src++;
        consume_non_digits(&src);
    }

    while (*src != '\0') {
        consume_non_digits(&src);
        if (isdigit(*src)) {
            if (digits_found >= NUMLEN) {
                memset(output, '0', NUMLEN);
                output[NUMLEN] = '\0';
                return false;
            }
            *dst++ = *src++;
            digits_found++;
        } else if (*src != '\0'){
            memset(output, '0', NUMLEN);
            output[NUMLEN] = '\0';
            return false;
        }
    }

    if (digits_found != NUMLEN) {
        memset(output, '0', NUMLEN);
        output[NUMLEN] = '\0';
        return false;
    }

    *dst = '\0';
    return true;
}

static bool is_allowed(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static void consume_non_digits(const char **s) {
    while (**s != '\0' && (is_allowed(**s))) {
        (*s)++;
    }
}