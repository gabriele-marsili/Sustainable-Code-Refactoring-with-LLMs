#include "roman_numerals.h"

#include <stdio.h>

char *thousands[] = {"", "M", "MM", "MMM"};
char *hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
char *tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
char *units[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

char *to_roman_numeral(unsigned int number) {
    char *result;

    result = malloc(sizeof(char) * (MAX_OUTPUT + 1));
    if (result == NULL) return (NULL);
    sprintf(result, "%s%s%s%s", thousands[number / 1000],
            hundreds[number % 1000 / 100], tens[number % 100 / 10],
            units[number % 10]);
    return (result);
}
