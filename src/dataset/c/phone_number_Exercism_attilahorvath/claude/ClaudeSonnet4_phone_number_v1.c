#include "phone_number.h"
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

#define NUMBER_LENGTH 11
#define BUFFER_LENGTH (NUMBER_LENGTH + 1)
#define AREA_CODE_LENGTH 4
#define FORMATTED_LENGTH 15

static int extract_digits(const char *input, char *buffer) {
    int n = 0;
    char c;
    
    for (int i = 0; (c = input[i]) != '\0'; i++) {
        if (isdigit(c)) {
            if (n >= NUMBER_LENGTH) return -1;
            buffer[n++] = c;
        } else if (!(isspace(c) || c == '+' || c == '-' || c == '(' || c == ')' || c == '.')) {
            return -1;
        }
    }
    
    return n;
}

char *phone_number_clean(const char *input) {
    char buffer[BUFFER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *number = (char*)malloc(NUMBER_LENGTH);
    
    if (digit_count == -1 || 
        (digit_count == NUMBER_LENGTH && buffer[0] != '1') ||
        (digit_count != 10 && digit_count != NUMBER_LENGTH)) {
        snprintf(number, NUMBER_LENGTH, "0000000000");
    } else {
        int offset = (digit_count == NUMBER_LENGTH) ? 1 : 0;
        buffer[digit_count] = '\0';
        snprintf(number, NUMBER_LENGTH, "%s", buffer + offset);
    }
    
    return number;
}

char *phone_number_get_area_code(const char *input) {
    char buffer[BUFFER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *area_code = (char*)malloc(AREA_CODE_LENGTH);
    
    if (digit_count == -1 || 
        (digit_count == NUMBER_LENGTH && buffer[0] != '1') ||
        (digit_count != 10 && digit_count != NUMBER_LENGTH)) {
        snprintf(area_code, AREA_CODE_LENGTH, "000");
    } else {
        int offset = (digit_count == NUMBER_LENGTH) ? 1 : 0;
        snprintf(area_code, AREA_CODE_LENGTH, "%c%c%c",
                 buffer[offset], buffer[offset + 1], buffer[offset + 2]);
    }
    
    return area_code;
}

char *phone_number_format(const char *input) {
    char buffer[BUFFER_LENGTH];
    int digit_count = extract_digits(input, buffer);
    
    char *formatted = (char*)malloc(FORMATTED_LENGTH);
    
    if (digit_count == -1 || 
        (digit_count == NUMBER_LENGTH && buffer[0] != '1') ||
        (digit_count != 10 && digit_count != NUMBER_LENGTH)) {
        snprintf(formatted, FORMATTED_LENGTH, "(000) 000-0000");
    } else {
        int offset = (digit_count == NUMBER_LENGTH) ? 1 : 0;
        snprintf(formatted, FORMATTED_LENGTH, "(%c%c%c) %c%c%c-%c%c%c%c",
                 buffer[offset], buffer[offset + 1], buffer[offset + 2],
                 buffer[offset + 3], buffer[offset + 4], buffer[offset + 5],
                 buffer[offset + 6], buffer[offset + 7], buffer[offset + 8],
                 buffer[offset + 9]);
    }
    
    return formatted;
}