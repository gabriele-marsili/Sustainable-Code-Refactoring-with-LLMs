#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#define N_DIGITS 10

static inline char get_digit(char c) {
    if(c >= '0' && c <= '9')
        return c;
    else if(c == '.' || c == '(' || c == ')' || c == '-' || c == ' ')
        return 0;
    else
        return -1;
}

static void shift_str(char *s, int d) {
    memmove(s, s + d, strlen(s + d) + 1);
}

char *phone_number_clean(const char *number) {
    char *phone_number = calloc(N_DIGITS + 1, sizeof(char));
    int p = 0;
    char n;
    
    for(const char *c = number; *c && p <= N_DIGITS; c++) {
        n = get_digit(*c);
        if(n == -1) {
            strcpy(phone_number, "0000000000");
            return phone_number;
        } else if(n != 0) {
            phone_number[p++] = n;
        }
    }
    
    if(p == 11 && phone_number[0] == '1') {
        shift_str(phone_number, 1);
        p = 10;
    }
    
    if(p != 10) {
        strcpy(phone_number, "0000000000");
    }
    
    return phone_number;
}

char *phone_number_get_area_code(const char *number) {
    char *clean_num = phone_number_clean(number);
    char *area_code = malloc(4 * sizeof(char));
    strncpy(area_code, clean_num, 3);
    area_code[3] = '\0';
    free(clean_num);
    return area_code;
}

char *phone_number_format(const char *number) {
    char *num = phone_number_clean(number);
    char *p_num = malloc(15 * sizeof(char));
    sprintf(p_num, "(%.3s) %.3s-%.4s", num, num + 3, num + 6);
    free(num);
    return p_num;
}