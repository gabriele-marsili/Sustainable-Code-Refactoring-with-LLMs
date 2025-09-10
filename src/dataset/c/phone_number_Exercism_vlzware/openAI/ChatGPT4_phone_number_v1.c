#include "phone_number.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define NUMLEN 10

static inline int is_allowed(char c) {
    return (c == ' ' || c == '.' || c == '-');
}

static inline void consume_space(char **s) {
    while (**s == ' ') (*s)++;
}

static inline int peek(int count, int (*check)(int), char *s) {
    for (int i = 0; i < count; i++) {
        while (is_allowed(*s)) s++;
        if (!check(*s++)) return 0;
    }
    return 1;
}

static inline char *err(char *res) {
    memset(res, '0', NUMLEN);
    res[NUMLEN] = '\0';
    return res;
}

static inline void cpcnt(char **dst, char **src, int count) {
    for (int i = 0; i < count; i++) {
        while (is_allowed(**src)) (*src)++;
        *(*dst)++ = *(*src)++;
    }
}

static int check_str(const char *s) {
    return (s && *s) ? strlen(s) : -1;
}

char *phone_number_clean(const char *input) {
    int len = check_str(input);
    if (len < 0) return NULL;

    char *res = (char *)malloc(NUMLEN + 1);
    if (!res) return NULL;

    char *tmp_r = res;
    const char *tmp_i = input;
    int digits = 0;

    consume_space((char **)&tmp_i);

    if (*tmp_i == '+') {
        if (*(tmp_i + 1) != '1' || *(tmp_i + 2) != ' ') return err(res);
        tmp_i += 3;
        digits++;
    }

    if (*tmp_i == '(') {
        if (!peek(3, isdigit, (char *)tmp_i + 1) || *(tmp_i + 4) != ')') return err(res);
        tmp_i++;
        cpcnt(&tmp_r, (char **)&tmp_i, 3);
        tmp_i++;
        digits += 3;
    }

    consume_space((char **)&tmp_i);

    if (*tmp_i == '1' && peek(NUMLEN, isdigit, (char *)tmp_i + 1)) tmp_i++;

    while (*tmp_i) {
        if (isdigit(*tmp_i)) {
            if (++digits > NUMLEN) return err(res);
            *tmp_r++ = *tmp_i;
        } else if (!is_allowed(*tmp_i)) {
            return err(res);
        }
        tmp_i++;
    }
    *tmp_r = '\0';

    if (digits != NUMLEN) return err(res);

    return res;
}

char *phone_number_get_area_code(const char *input) {
    char *cl = phone_number_clean(input);
    if (!cl) return NULL;

    char *res = (char *)malloc(4);
    if (!res) {
        free(cl);
        return NULL;
    }

    memcpy(res, cl, 3);
    res[3] = '\0';

    free(cl);
    return res;
}

char *phone_number_format(const char *input) {
    char *cl = phone_number_clean(input);
    if (!cl || *cl == '0') return cl;

    char *res = (char *)malloc(15);
    if (!res) {
        free(cl);
        return NULL;
    }

    snprintf(res, 15, "(%.3s) %.3s-%.4s", cl, cl + 3, cl + 6);

    free(cl);
    return res;
}