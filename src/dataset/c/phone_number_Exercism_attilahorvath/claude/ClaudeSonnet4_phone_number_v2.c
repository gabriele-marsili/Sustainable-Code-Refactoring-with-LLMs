#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define NUMBER_LENGTH 11
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

static int extract_digits(const char *input, char *buffer) {
    int n = 0;
    char c;
    
    for (int i = 0; (c = input[i]) != '\0' && n < NUMBER_LENGTH; i++) {
        if (isdigit(c)) {
            buffer[n++] = c;
        } else if (c != ' ' && c != '+' && c != '-' && c != '(' && c != ')' && c != '.') {
            return -1; // Invalid character
        }
    }
    
    return n;
}

char *phone_number_clean(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *number = (char*)malloc(NUMBER_LENGTH);
    
    if (digit_count == 10) {
        memcpy(number, buffer, 10);
        number[10] = '\0';
    } else if (digit_count == 11 && buffer[0] == '1') {
        memcpy(number, buffer + 1, 10);
        number[10] = '\0';
    } else {
        strcpy(number, "0000000000");
    }
    
    return number;
}

char *phone_number_get_area_code(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *area_code = (char*)malloc(AREA_CODE_LENGTH);
    
    if (digit_count == 10) {
        area_code[0] = buffer[0];
        area_code[1] = buffer[1];
        area_code[2] = buffer[2];
        area_code[3] = '\0';
    } else if (digit_count == 11 && buffer[0] == '1') {
        area_code[0] = buffer[1];
        area_code[1] = buffer[2];
        area_code[2] = buffer[3];
        area_code[3] = '\0';
    } else {
        strcpy(area_code, "000");
    }
    
    return area_code;
}

char *phone_number_format(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *formatted = (char*)malloc(FORMATTED_LENGTH);
    
    if (digit_count == 10) {
        snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
                 buffer[0], buffer[1], buffer[2], buffer[3], buffer[4],
                 buffer[5], buffer[6], buffer[7], buffer[8], buffer[9]);
    } else if (digit_count == 11 && buffer[0] == '1') {
        snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
                 buffer[1], buffer[2], buffer[3], buffer[4], buffer[5],
                 buffer[6], buffer[7], buffer[8], buffer[9], buffer[10]);
    } else {
        strcpy(formatted, "(000) 000-0000");
    }
    
    return formatted;
}