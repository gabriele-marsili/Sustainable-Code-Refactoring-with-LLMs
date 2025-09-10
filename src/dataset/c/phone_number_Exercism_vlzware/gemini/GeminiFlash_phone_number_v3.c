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

static char *err(char *err) {
    memset(err, '0', NUMLEN);
    err[NUMLEN] = '\0';
    return err;
}

char *phone_number_clean(const char *input) {
    if (!input || !*input) {
        return NULL;
    }

    char *res = (char*) malloc(NUMLEN + 1);
    if (!res) {
        return NULL;
    }

    const char *tmp_i = input;
    char *tmp_r = res;
    int digits = 0;

    while (*tmp_i) {
        if (isdigit(*tmp_i)) {
            *tmp_r++ = *tmp_i;
            if (++digits > NUMLEN) {
                free(res);
                return err((char*)malloc(NUMLEN + 1));
            }
        } else if (!is_allowed(*tmp_i) && *tmp_i != '+' && *tmp_i != '(' && *tmp_i != ')') {
            free(res);
            return err((char*)malloc(NUMLEN + 1));
        }
        tmp_i++;
    }

    if (digits < NUMLEN) {
        free(res);
        return err((char*)malloc(NUMLEN + 1));
    }

    if (digits > NUMLEN) {
        free(res);
        return err((char*)malloc(NUMLEN + 1));
    }

    if (digits == NUMLEN) {
        if (res[0] == '0') {
            free(res);
            return err((char*)malloc(NUMLEN + 1));
        }
    }

    tmp_r = res;
    if (tmp_r[0] == '1') {
        memmove(tmp_r, tmp_r + 1, NUMLEN);
        tmp_r[NUMLEN - 1] = '\0';
    } else {
        tmp_r[NUMLEN] = '\0';
    }

    return res;
}

char *phone_number_get_area_code(const char *input) {
    char *cl = phone_number_clean(input);
    if (!cl) return NULL;

    char *res = (char*) malloc(4);
    if (!res) {
        free(cl);
        return NULL;
    }

    strncpy(res, cl, 3);
    res[3] = '\0';
    free(cl);
    return res;
}

char *phone_number_format(const char *input) {
    char *cl = phone_number_clean(input);
    if (!cl) return NULL;

    char *res = (char*) malloc(15);
    if (!res) {
        free(cl);
        return NULL;
    }

    snprintf(res, 15, "(%c%c%c) %c%c%c-%c%c%c%c",
             cl[0], cl[1], cl[2], cl[3], cl[4], cl[5], cl[6], cl[7], cl[8], cl[9]);

    free(cl);
    return res;
}