#include "roman_numerals.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static const char *thousands[] = {"", "M", "MM", "MMM"};
static const char *hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
static const char *tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
static const char *units[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

char *to_roman_numeral(unsigned int number) {
    static char result[MAX_OUTPUT + 1];
    char *ptr = result;

    if (number > 3999) return NULL; // Ensure input is within valid range

    strcpy(ptr, thousands[number / 1000]);
    ptr += strlen(ptr);
    strcpy(ptr, hundreds[(number % 1000) / 100]);
    ptr += strlen(ptr);
    strcpy(ptr, tens[(number % 100) / 10]);
    ptr += strlen(ptr);
    strcpy(ptr, units[number % 10]);

    return result;
}