#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define NUMBER_LENGTH 11
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

static void clean_number(const char *input, char *output) {
    int n = 0;
    for (int i = 0; input[i] != '\0' && n < NUMBER_LENGTH; i++) {
        if (isdigit(input[i])) {
            output[n++] = input[i];
        }
    }
    output[n] = '\0';

    if ((n == NUMBER_LENGTH && output[0] != '1') || (n != 10 && n != NUMBER_LENGTH)) {
        strcpy(output, "0000000000");
    } else if (n == NUMBER_LENGTH) {
        memmove(output, output + 1, 10);
        output[10] = '\0';
    }
}

char *phone_number_clean(const char *input) {
    char *number = (char *)malloc(11);
    if (!number) return NULL;
    clean_number(input, number);
    return number;
}

char *phone_number_get_area_code(const char *input) {
    char clean[NUMBER_LENGTH];
    clean_number(input, clean);

    char *area_code = (char *)malloc(AREA_CODE_LENGTH);
    if (!area_code) return NULL;

    snprintf(area_code, AREA_CODE_LENGTH, "%c%c%c", clean[0], clean[1], clean[2]);
    return area_code;
}

char *phone_number_format(const char *input) {
    char clean[NUMBER_LENGTH];
    clean_number(input, clean);

    char *formatted = (char *)malloc(FORMATTED_LENGTH);
    if (!formatted) return NULL;

    snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
             clean[0], clean[1], clean[2], clean[3], clean[4],
             clean[5], clean[6], clean[7], clean[8], clean[9]);
    return formatted;
}