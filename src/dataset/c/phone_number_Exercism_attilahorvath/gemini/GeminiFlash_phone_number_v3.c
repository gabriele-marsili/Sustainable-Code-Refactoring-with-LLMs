#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define NUMBER_LENGTH 10
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

char *phone_number_clean(const char *input) {
    char *number = (char*)malloc(NUMBER_LENGTH + 1);
    if (!number) return NULL;

    int n = 0;
    for (int i = 0; input[i] != '\0'; i++) {
        if (isdigit(input[i])) {
            if (n < NUMBER_LENGTH + 1) {
                number[n++] = input[i];
            } else {
                free(number);
                number = (char*)malloc(NUMBER_LENGTH + 1);
                if (!number) return NULL;
                strncpy(number, "0000000000", NUMBER_LENGTH + 1);
                return number;
            }
        } else if (!isspace(input[i]) && input[i] != '+' && input[i] != '-' &&
                   input[i] != '(' && input[i] != ')' && input[i] != '.') {
            free(number);
            number = (char*)malloc(NUMBER_LENGTH + 1);
            if (!number) return NULL;
            strncpy(number, "0000000000", NUMBER_LENGTH + 1);
            return number;
        }
    }

    number[n] = '\0';

    int len = strlen(number);

    if (len == 11 && number[0] == '1') {
        memmove(number, number + 1, NUMBER_LENGTH);
        number[NUMBER_LENGTH] = '\0';
    } else if (len != NUMBER_LENGTH) {
        free(number);
        number = (char*)malloc(NUMBER_LENGTH + 1);
        if (!number) return NULL;
        strncpy(number, "0000000000", NUMBER_LENGTH + 1);
    }

    return number;
}

char *phone_number_get_area_code(const char *input) {
    char *number = phone_number_clean(input);
    if (!number) return NULL;

    char *area_code = (char*)malloc(AREA_CODE_LENGTH);
    if (!area_code) {
        free(number);
        return NULL;
    }

    strncpy(area_code, number, 3);
    area_code[3] = '\0';

    free(number);
    return area_code;
}

char *phone_number_format(const char *input) {
    char *number = phone_number_clean(input);
    if (!number) return NULL;

    char *formatted = (char*)malloc(FORMATTED_LENGTH);
    if (!formatted) {
        free(number);
        return NULL;
    }

    snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
             number[0], number[1], number[2], number[3], number[4],
             number[5], number[6], number[7], number[8], number[9]);

    free(number);
    return formatted;
}