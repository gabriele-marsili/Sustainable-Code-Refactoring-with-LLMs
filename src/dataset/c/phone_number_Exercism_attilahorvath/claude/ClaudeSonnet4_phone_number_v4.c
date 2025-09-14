#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NUMBER_LENGTH 11
#define BUFFER_LENGTH (NUMBER_LENGTH + 1)
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

static int extract_digits(const char *input, char *buffer) {
    int n = 0;
    char c;
    
    for (int i = 0; (c = input[i]) != '\0' && n < NUMBER_LENGTH; i++) {
        if (c >= '0' && c <= '9') {
            buffer[n++] = c;
        } else if (c != ' ' && c != '+' && c != '-' && c != '(' && c != ')' && c != '.') {
            return -1;
        }
    }
    
    return n;
}

char *phone_number_clean(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *number = malloc(NUMBER_LENGTH);
    
    if (digit_count == -1 || digit_count < 10 || digit_count > 11 || 
        (digit_count == 11 && buffer[0] != '1')) {
        memcpy(number, "0000000000", NUMBER_LENGTH);
    } else {
        int offset = (digit_count == 11) ? 1 : 0;
        memcpy(number, buffer + offset, 10);
        number[10] = '\0';
    }
    
    return number;
}

char *phone_number_get_area_code(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *area_code = malloc(AREA_CODE_LENGTH);
    
    if (digit_count == -1 || digit_count < 10 || digit_count > 11 || 
        (digit_count == 11 && buffer[0] != '1')) {
        memcpy(area_code, "000", 4);
    } else {
        int offset = (digit_count == 11) ? 1 : 0;
        memcpy(area_code, buffer + offset, 3);
        area_code[3] = '\0';
    }
    
    return area_code;
}

char *phone_number_format(const char *input) {
    char buffer[NUMBER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *formatted = malloc(FORMATTED_LENGTH);
    
    if (digit_count == -1 || digit_count < 10 || digit_count > 11 || 
        (digit_count == 11 && buffer[0] != '1')) {
        memcpy(formatted, "(000) 000-0000", FORMATTED_LENGTH);
    } else {
        int offset = (digit_count == 11) ? 1 : 0;
        char *digits = buffer + offset;
        snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
                 digits[0], digits[1], digits[2], digits[3], digits[4],
                 digits[5], digits[6], digits[7], digits[8], digits[9]);
    }
    
    return formatted;
}