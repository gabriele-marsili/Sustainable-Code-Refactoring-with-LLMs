#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define NUMLEN 10

static inline int is_allowed(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static inline void consume_space(const char **s) {
    while (**s == ' ')
        (*s)++;
}

char *phone_number_clean(const char *input)
{
    if (!input || !*input)
        return NULL;

    char *res = malloc(NUMLEN + 1);
    if (!res)
        return NULL;

    const char *src = input;
    char *dst = res;
    int digits = 0;

    consume_space(&src);

    // Handle '+1 ' prefix
    if (*src == '+') {
        if (src[1] != '1' || src[2] != ' ') {
            memset(res, '0', NUMLEN);
            res[NUMLEN] = '\0';
            return res;
        }
        src += 3;
    }

    // Handle '(ddd)' area code
    if (*src == '(') {
        src++;
        for (int i = 0; i < 3; i++) {
            while (is_allowed(*src)) src++;
            if (!isdigit(*src)) {
                memset(res, '0', NUMLEN);
                res[NUMLEN] = '\0';
                return res;
            }
            *dst++ = *src++;
            digits++;
        }
        if (*src != ')') {
            memset(res, '0', NUMLEN);
            res[NUMLEN] = '\0';
            return res;
        }
        src++;
    }

    consume_space(&src);

    // Skip leading '1' if followed by 10 digits
    if (*src == '1') {
        const char *temp = src + 1;
        int digit_count = 0;
        while (*temp) {
            if (isdigit(*temp)) {
                digit_count++;
                if (digit_count > NUMLEN) break;
            } else if (!is_allowed(*temp)) {
                break;
            }
            temp++;
        }
        if (digit_count == NUMLEN) {
            src++;
        }
    }

    // Process remaining characters
    while (*src) {
        if (isdigit(*src)) {
            if (++digits > NUMLEN) {
                memset(res, '0', NUMLEN);
                res[NUMLEN] = '\0';
                return res;
            }
            *dst++ = *src;
        } else if (!is_allowed(*src)) {
            memset(res, '0', NUMLEN);
            res[NUMLEN] = '\0';
            return res;
        }
        src++;
    }

    *dst = '\0';

    if (digits != NUMLEN) {
        memset(res, '0', NUMLEN);
        res[NUMLEN] = '\0';
    }

    return res;
}

char *phone_number_get_area_code(const char *input)
{
    char *cl = phone_number_clean(input);
    if (!cl)
        return NULL;

    char *res = malloc(4);
    if (!res) {
        free(cl);
        return NULL;
    }

    memcpy(res, cl, 3);
    res[3] = '\0';

    free(cl);
    return res;
}

char *phone_number_format(const char *input)
{
    char *cl = phone_number_clean(input);
    if (!cl)
        return NULL;

    if (cl[0] == '0')
        return cl;

    char *res = malloc(15);
    if (!res) {
        free(cl);
        return NULL;
    }

    // Format: (xxx) xxx-xxxx
    res[0] = '(';
    memcpy(res + 1, cl, 3);
    res[4] = ')';
    res[5] = ' ';
    memcpy(res + 6, cl + 3, 3);
    res[9] = '-';
    memcpy(res + 10, cl + 6, 4);
    res[14] = '\0';

    free(cl);
    return res;
}