#include "roman_numerals.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *to_roman_numeral(unsigned int number) {
    if (number > 3999 || number == 0) {
        return NULL;
    }

    char *result = malloc(MAX_OUTPUT + 1);
    if (result == NULL) {
        return NULL;
    }
    result[0] = '\0';

    const char *roman_map[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    const int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};

    for (int i = 0; i < 13; ++i) {
        while (number >= values[i]) {
            strcat(result, roman_map[i]);
            number -= values[i];
        }
    }

    return result;
}