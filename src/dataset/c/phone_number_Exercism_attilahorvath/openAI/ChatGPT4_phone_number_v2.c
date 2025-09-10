#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define NUMBER_LENGTH 11
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

static int clean_phone_number(const char *input, char *output) {
    int n = 0;

    for (int i = 0; input[i] != '\0'; i++) {
        if (isdigit(input[i])) {
            if (n >= NUMBER_LENGTH - 1) return 0; // Invalid if too many digits
            output[n++] = input[i];
        } else if (!isspace(input[i]) && input[i] != '+' && input[i] != '-' &&
                   input[i] != '(' && input[i] != ')' && input[i] != '.') {
            return 0; // Invalid if contains invalid characters
        }
    }

    if ((n == NUMBER_LENGTH - 1 && output[0] != '1') || (n != 10 && n != 11)) {
        return 0; // Invalid if wrong length or invalid country code
    }

    if (n == 11) memmove(output, output + 1, 10); // Remove leading '1' if present
    output[10] = '\0'; // Null-terminate the cleaned number
    return 1; // Valid number
}

char *phone_number_clean(const char *input) {
    char *number = (char *)malloc(11);
    if (!clean_phone_number(input, number)) {
        strcpy(number, "0000000000");
    }
    return number;
}

char *phone_number_get_area_code(const char *input) {
    char cleaned[11];
    if (!clean_phone_number(input, cleaned)) {
        return strdup("000");
    }
    char *area_code = (char *)malloc(AREA_CODE_LENGTH);
    snprintf(area_code, AREA_CODE_LENGTH, "%c%c%c", cleaned[0], cleaned[1], cleaned[2]);
    return area_code;
}

char *phone_number_format(const char *input) {
    char cleaned[11];
    if (!clean_phone_number(input, cleaned)) {
        return strdup("(000) 000-0000");
    }
    char *formatted = (char *)malloc(FORMATTED_LENGTH);
    snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
             cleaned[0], cleaned[1], cleaned[2], cleaned[3], cleaned[4],
             cleaned[5], cleaned[6], cleaned[7], cleaned[8], cleaned[9]);
    return formatted;
}