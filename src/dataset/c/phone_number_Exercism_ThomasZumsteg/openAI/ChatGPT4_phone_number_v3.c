#include "phone_number.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#define N_DIGITS 10

char get_digit(char c) {
    if ('0' <= c && c <= '9')
        return c;
    else if (c == '.' || c == '(' || c == ')' || c == '-' || c == ' ')
        return 0;
    else
        return -1;
}

char *phone_number_clean(const char *number) {
    char phone_number[N_DIGITS + 1] = {0};
    int p = 0;

    for (const char *c = number; *c && p < N_DIGITS + 1; c++) {
        char n = get_digit(*c);
        if (n == -1) {
            strcpy(phone_number, "0000000000");
            break;
        } else if (n != 0) {
            phone_number[p++] = n;
        }
    }

    if (p == 11 && phone_number[0] == '1') {
        memmove(phone_number, phone_number + 1, N_DIGITS);
        phone_number[N_DIGITS - 1] = '\0';
    }

    if (p != 10) {
        strcpy(phone_number, "0000000000");
    }

    return strdup(phone_number);
}

char *phone_number_get_area_code(const char *number) {
    char *cleaned = phone_number_clean(number);
    char *area_code = strndup(cleaned, 3);
    free(cleaned);
    return area_code;
}

char *phone_number_format(const char *number) {
    char *cleaned = phone_number_clean(number);
    char *formatted = malloc(15); // "(XXX) XXX-XXXX" + null terminator
    snprintf(formatted, 15, "(%.*s) %.*s-%.*s", 3, cleaned, 3, cleaned + 3, 4, cleaned + 6);
    free(cleaned);
    return formatted;
}