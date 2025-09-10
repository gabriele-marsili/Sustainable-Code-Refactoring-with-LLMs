#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define NUMBER_LENGTH 10
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15
#define INVALID_NUMBER "0000000000"

static int is_valid_character(char c) {
    return isdigit(c) || isspace(c) || c == '+' || c == '-' || c == '(' || c == ')' || c == '.';
}

char *phone_number_clean(const char *input) {
    char *number = (char*)malloc(NUMBER_LENGTH + 1);
    if (number == NULL) return NULL;

    char cleaned_number[NUMBER_LENGTH + 1];
    int n = 0;

    for (int i = 0; input[i] != '\0'; i++) {
        char c = input[i];
        if (!is_valid_character(c)) {
            strcpy(number, INVALID_NUMBER);
            return number;
        }
        if (isdigit(c)) {
            if (n < NUMBER_LENGTH + 1) {
                cleaned_number[n++] = c;
            } else {
                strcpy(number, INVALID_NUMBER);
                return number;
            }
        }
    }
    cleaned_number[n] = '\0';

    int len = strlen(cleaned_number);

    if (len == NUMBER_LENGTH) {
        strcpy(number, cleaned_number);
    } else if (len == NUMBER_LENGTH + 1 && cleaned_number[0] == '1') {
        strcpy(number, cleaned_number + 1);
    } else {
        strcpy(number, INVALID_NUMBER);
    }

    return number;
}

char *phone_number_get_area_code(const char *input) {
    char *number = phone_number_clean(input);
    if (number == NULL) return NULL;

    char *area_code = (char*)malloc(AREA_CODE_LENGTH);
    if (area_code == NULL) {
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
    if (number == NULL) return NULL;

    char *formatted = (char*)malloc(FORMATTED_LENGTH);
    if (formatted == NULL) {
        free(number);
        return NULL;
    }

    snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
             number[0], number[1], number[2], number[3], number[4],
             number[5], number[6], number[7], number[8], number[9]);

    free(number);
    return formatted;
}