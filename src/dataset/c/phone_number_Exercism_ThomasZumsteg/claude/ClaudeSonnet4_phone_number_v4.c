#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#define N_DIGITS 10

static inline char get_digit(char c) {
    if (c >= '0' && c <= '9')
        return c;
    else if (c == '.' || c == '(' || c == ')' || c == '-' || c == ' ')
        return 0;
    else
        return -1;
}

char *phone_number_clean(const char *number) {
    char *phone_number = malloc(N_DIGITS + 1);
    int p = 0;
    char n;
    
    for (const char *c = number; *c && p <= N_DIGITS; c++) {
        n = get_digit(*c);
        if (n == -1) {
            strcpy(phone_number, "0000000000");
            return phone_number;
        } else if (n != 0) {
            phone_number[p++] = n;
        }
    }
    
    phone_number[p] = '\0';
    
    if (p == 11 && phone_number[0] == '1') {
        memmove(phone_number, phone_number + 1, N_DIGITS);
        phone_number[N_DIGITS] = '\0';
        p = N_DIGITS;
    }
    
    if (p != N_DIGITS) {
        strcpy(phone_number, "0000000000");
    }
    
    return phone_number;
}

char *phone_number_get_area_code(const char *number) {
    char *clean_number = phone_number_clean(number);
    char *area_code = malloc(4);
    
    area_code[0] = clean_number[0];
    area_code[1] = clean_number[1];
    area_code[2] = clean_number[2];
    area_code[3] = '\0';
    
    free(clean_number);
    return area_code;
}

char *phone_number_format(const char *number) {
    char *num = phone_number_clean(number);
    char *p_num = malloc(15);
    
    sprintf(p_num, "(%c%c%c) %c%c%c-%c%c%c%c", 
            num[0], num[1], num[2],
            num[3], num[4], num[5],
            num[6], num[7], num[8], num[9]);
    
    free(num);
    return p_num;
}