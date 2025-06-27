#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

#define NUMBER_LENGTH 11
#define BUFFER_LENGTH (NUMBER_LENGTH + 1)
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

char *phone_number_clean(const char *input) {
    char *number = (char*)malloc(NUMBER_LENGTH);

    char buffer[BUFFER_LENGTH];
    char c;
    int invalid = 0;
    int n = 0;
    int offset = 0;

    for (int i = 0; (c = input[i]) != '\0'; i++) {
        if (!isdigit(c) && !isspace(c) && c != '+' && c != '-'
            && c != '(' && c != ')' && c != '.') {
            invalid = 1;
            break;
        }

        if (isdigit(c)) {
            buffer[n++] = c;

            if (n >= BUFFER_LENGTH) {
                invalid = 1;
                break;
            }
        }
    }

    buffer[n++] = '\0';

    if ((n == BUFFER_LENGTH && buffer[0] != '1')
        || (n != NUMBER_LENGTH && n != BUFFER_LENGTH)) {
        invalid = 1;
    }

    if (invalid) {
        snprintf(number, NUMBER_LENGTH, "0000000000");
    } else {
        offset = n == BUFFER_LENGTH ? 1 : 0;
        snprintf(number, NUMBER_LENGTH, "%s", buffer + offset);
    }

    return number;
}

char *phone_number_get_area_code(const char *input) {
    char *number = phone_number_clean(input);
    char *area_code = (char*)malloc(AREA_CODE_LENGTH);

    snprintf(area_code, AREA_CODE_LENGTH, "%c%c%c",
             number[0], number[1], number[2]);

    free(number);

    return area_code;
}

char *phone_number_format(const char *input) {
    char *number = phone_number_clean(input);
    char *formatted = (char*)malloc(FORMATTED_LENGTH);

    snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
             number[0], number[1], number[2], number[3], number[4],
             number[5], number[6], number[7], number[8], number[9]);

    free(number);

    return formatted;
}
