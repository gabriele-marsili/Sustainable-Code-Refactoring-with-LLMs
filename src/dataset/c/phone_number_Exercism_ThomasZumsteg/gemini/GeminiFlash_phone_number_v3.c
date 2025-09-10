#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>

#define N_DIGITS 10

static inline char get_digit(char c) {
    if (isdigit((unsigned char)c)) {
        return c;
    } else if (c == '.' || c == '(' || c == ')' || c == '-' || c == ' ') {
        return 0;
    } else {
        return -1;
    }
}

static inline void shift_str(char *s) {
    memmove(s, s + 1, strlen(s));
}

char *phone_number_clean(const char *number) {
    char *phone_number = malloc(N_DIGITS + 1);
    if (!phone_number) return NULL;

    int p = 0;
    char n;
    for (const char *c = number; *c; c++) {
        n = get_digit(*c);
        if (n == -1) {
            strcpy(phone_number, "0000000000");
            phone_number[N_DIGITS] = '\0';
            return phone_number;
        } else if (n != 0) {
            if (p < N_DIGITS) {
                phone_number[p++] = n;
            } else {
                free(phone_number);
                phone_number = malloc(N_DIGITS + 1);
                strcpy(phone_number, "0000000000");
                phone_number[N_DIGITS] = '\0';
                return phone_number;
            }
        }
    }
    phone_number[p] = '\0';

    if (p == 11 && phone_number[0] == '1') {
        shift_str(phone_number);
        p--;
    }

    if (p != N_DIGITS) {
        strcpy(phone_number, "0000000000");
        phone_number[N_DIGITS] = '\0';
    } else {
        phone_number[N_DIGITS] = '\0';
    }

    return phone_number;
}

char *phone_number_get_area_code(const char *number) {
    char *cleaned_number = phone_number_clean(number);
    if (!cleaned_number) return NULL;

    char *area_code = malloc(4);
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
    char *num = phone_number_clean(number);
    if (!num) return NULL;

    char *p_num = malloc(15);
    if (!p_num) {
        free(num);
        return NULL;
    }

    snprintf(p_num, 15, "(%c%c%c) %c%c%c-%c%c%c%c",
             num[0], num[1], num[2], num[3], num[4], num[5], num[6], num[7], num[8], num[9]);

    free(num);
    return p_num;
}