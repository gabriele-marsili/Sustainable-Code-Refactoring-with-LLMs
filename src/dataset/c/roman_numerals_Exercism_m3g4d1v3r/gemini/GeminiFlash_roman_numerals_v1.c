#include "roman_numerals.h"
#include <stdlib.h>

const char *thousands[] = {"", "M", "MM", "MMM"};
const char *hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
const char *tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
const char *units[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

char *to_roman_numeral(unsigned int number) {
    char *result = malloc(MAX_OUTPUT + 1);
    if (!result) return NULL;

    char *ptr = result;
    ptr += sprintf(ptr, "%s", thousands[number / 1000]);
    ptr += sprintf(ptr, "%s", hundreds[(number % 1000) / 100]);
    ptr += sprintf(ptr, "%s", tens[(number % 100) / 10]);
    sprintf(ptr, "%s", units[number % 10]);

    return result;
}