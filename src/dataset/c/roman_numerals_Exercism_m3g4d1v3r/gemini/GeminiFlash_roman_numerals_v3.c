#include "roman_numerals.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *thousands[] = {"", "M", "MM", "MMM"};
char *hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
char *tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
char *units[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

char *to_roman_numeral(unsigned int number) {
    char *result;
    size_t len = 0;

    len += strlen(thousands[number / 1000]);
    len += strlen(hundreds[number % 1000 / 100]);
    len += strlen(tens[number % 100 / 10]);
    len += strlen(units[number % 10]);

    result = malloc(len + 1);
    if (result == NULL) return (NULL);

    result[0] = '\0';
    strcat(result, thousands[number / 1000]);
    strcat(result, hundreds[number % 1000 / 100]);
    strcat(result, tens[number % 100 / 10]);
    strcat(result, units[number % 10]);

    return (result);
}