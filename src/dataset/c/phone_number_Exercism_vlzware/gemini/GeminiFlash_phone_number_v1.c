#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define NUMLEN 10

static bool is_allowed(char c);
static void copy_digits(char *dst, const char *src, int count);
static void skip_non_digits(const char **s);
static char *handle_error(char *res);

char *phone_number_clean(const char *input) {
    if (input == NULL || *input == '\0') {
        return NULL;
    }

    char *res = (char *)malloc(NUMLEN + 1);
    if (res == NULL) {
        return NULL;
    }

    char *out = res;
    const char *in = input;
    int digits_found = 0;

    skip_non_digits(&in);

    if (*in == '+') {
        if (in[1] == '1' && in[2] == ' ') {
            in += 3;
        } else {
            return handle_error(res);
        }
    }

    skip_non_digits(&in);

    if (*in == '(') {
        in++;
        if (!isdigit(in[0]) || !isdigit(in[1]) || !isdigit(in[2]) || in[3] != ')') {
            return handle_error(res);
        }
        copy_digits(out, in, 3);
        out += 3;
        in += 4;
        digits_found += 3;
    }

    skip_non_digits(&in);

    if (*in == '1' && isdigit(in[1])) {
        in++;
    }

    skip_non_digits(&in);

    while (*in) {
        if (isdigit(*in)) {
            if (digits_found >= NUMLEN) {
                return handle_error(res);
            }
            *out++ = *in;
            digits_found++;
        } else if (!is_allowed(*in)) {
            return handle_error(res);
        }
        in++;
        skip_non_digits(&in);
    }

    if (digits_found != NUMLEN) {
        return handle_error(res);
    }

    *out = '\0';
    return res;
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

static bool is_allowed(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static void copy_digits(char *dst, const char *src, int count) {
    for (int i = 0; i < count; i++) {
        *dst++ = *src++;
    }
}

static void skip_non_digits(const char **s) {
    while (**s && is_allowed(**s)) {
        (*s)++;
    }
}

static char *handle_error(char *res) {
    memset(res, '0', NUMLEN);
    res[NUMLEN] = '\0';
    return res;
}