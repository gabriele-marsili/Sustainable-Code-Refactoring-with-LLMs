#include "binary.h"

#include <math.h>
#include <stdlib.h>
#include <string.h>

int write_reverse(const char *input, char *reverse);

int write_reverse(const char *input, char *reverse) {
    *reverse-- = '\0';
    while (*input != '\0') {
        if (*input != '0' && *input != '1') return (-1);
        *reverse-- = *input++;
    }
    return (0);
}

// 0 1 2 3 4 5 6 7 8 9

int convert(const char *input) {
    int result = 0;
    int input_size = strlen(input);
    char *reverse = malloc(sizeof(char) + input_size + 1);
    int reverse_i = 0;
    if (write_reverse(input, reverse + input_size) != 0) {
        free(reverse);
        return (-1);
    }
    while (*reverse != '\0') {
        result += (*reverse++ - '0') * pow(2, reverse_i);
        reverse_i++;
    }
    free(reverse - reverse_i);
    return (result);
}
