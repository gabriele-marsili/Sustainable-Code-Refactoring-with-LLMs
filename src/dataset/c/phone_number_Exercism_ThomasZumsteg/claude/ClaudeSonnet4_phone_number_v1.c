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

char *substr(const char *str, int start, int stop) {
    int len = stop - start;
    char *slice = malloc(len + 1);
    memcpy(slice, str + start, len);
    slice[len] = '\0';
    return slice;
}

char *phone_number_clean(const char *number) {
    char temp[12];
    int p = 0;
    char n;
    
    for(const char *c = number; *c && p < 11; c++) {
        n = get_digit(*c);
        if(n == -1) {
            char *result = malloc(11);
            strcpy(result, "0000000000");
            return result;
        } else if(n != 0) {
            temp[p++] = n;
        }
    }
    temp[p] = '\0';
    
    if(p == 11 && temp[0] == '1') {
        memmove(temp, temp + 1, 10);
        temp[10] = '\0';
        p = 10;
    }
    
    char *result = malloc(11);
    if(p == 10) {
        strcpy(result, temp);
    } else {
        strcpy(result, "0000000000");
    }
    return result;
}

char *phone_number_get_area_code(const char *number) {
    char *clean = phone_number_clean(number);
    char *area = malloc(4);
    memcpy(area, clean, 3);
    area[3] = '\0';
    free(clean);
    return area;
}

char *phone_number_format(const char *number) {
    char *num = phone_number_clean(number);
    char *p_num = malloc(15);
    sprintf(p_num, "(%.3s) %.3s-%.4s", num, num + 3, num + 6);
    free(num);
    return p_num;
}