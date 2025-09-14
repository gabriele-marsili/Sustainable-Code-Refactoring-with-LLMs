#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#define N_DIGITS 10
#define FORMATTED_LENGTH 14
#define INVALID_NUMBER "0000000000"

static inline char get_digit(char c) {
    if (c >= '0' && c <= '9')
        return c;
    else if (c == '.' || c == '(' || c == ')' || c == '-' || c == ' ')
        return 0;
    else
        return -1;
}

static char* clean_phone_number(const char *number) {
    char *phone_number = malloc(N_DIGITS + 1);
    int p = 0;
    char n;
    
    for (const char *c = number; *c && p <= N_DIGITS; c++) {
        n = get_digit(*c);
        if (n == -1) {
            strcpy(phone_number, INVALID_NUMBER);
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
        strcpy(phone_number, INVALID_NUMBER);
    }
    
    return phone_number;
}

char *phone_number_clean(const char *number) {
    return clean_phone_number(number);
}

char *phone_number_get_area_code(const char *number) {
    char *cleaned = clean_phone_number(number);
    char *area_code = malloc(4);
    memcpy(area_code, cleaned, 3);
    area_code[3] = '\0';
    free(cleaned);
    return area_code;
}

char *phone_number_format(const char *number) {
    char *cleaned = clean_phone_number(number);
    char *formatted = malloc(FORMATTED_LENGTH + 1);
    
    sprintf(formatted, "(%.3s) %.3s-%.4s", 
            cleaned, cleaned + 3, cleaned + 6);
    
    free(cleaned);
    return formatted;
}