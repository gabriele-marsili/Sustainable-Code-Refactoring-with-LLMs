#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>

#define N_DIGITS 10
#define INVALID_NUMBER "0000000000"

char *phone_number_clean(const char *number) {
    char *phone_number = malloc(N_DIGITS + 1);
    if (!phone_number) return NULL;

    int p = 0;
    for (const char *c = number; *c; c++) {
        if (isdigit(*c)) {
            phone_number[p++] = *c;
            if (p > N_DIGITS) {
                strcpy(phone_number, INVALID_NUMBER);
                phone_number[N_DIGITS] = '\0';
                return phone_number;
            }
        } else if (!strchr(".()- ", *c)) {
            strcpy(phone_number, INVALID_NUMBER);
            phone_number[N_DIGITS] = '\0';
            return phone_number;
        }
    }

    phone_number[p] = '\0';

    if (p == 11 && phone_number[0] == '1') {
        memmove(phone_number, phone_number + 1, N_DIGITS);
        phone_number[N_DIGITS] = '\0';
        p = N_DIGITS;
    }

    if (p != N_DIGITS) {
        strcpy(phone_number, INVALID_NUMBER);
        phone_number[N_DIGITS] = '\0';
    }

    return phone_number;
}

char *phone_number_get_area_code(const char *number) {
    char *cleaned_number = phone_number_clean(number);
    if (strcmp(cleaned_number, INVALID_NUMBER) == 0) {
        free(cleaned_number);
        char *area_code = malloc(4);
        if (!area_code) return NULL;
        strncpy(area_code, "000", 3);
        area_code[3] = '\0';
        return area_code;
    }
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
    if (strcmp(num, INVALID_NUMBER) == 0) {
        free(num);
        char *p_num = malloc(15);
        if (!p_num) return NULL;
        strcpy(p_num, "(000) 000-0000");
        return p_num;
    }
    char *p_num = malloc(15);
    if (!p_num) {
        free(num);
        return NULL;
    }
    sprintf(p_num, "(%.3s) %.3s-%.4s", num, num + 3, num + 6);
    free(num);
    return p_num;
}