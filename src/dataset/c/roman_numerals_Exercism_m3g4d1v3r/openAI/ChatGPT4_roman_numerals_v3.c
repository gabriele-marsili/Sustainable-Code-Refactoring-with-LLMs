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
    snprintf(result, sizeof(result), "%s%s%s%s", 
             thousands[number / 1000],
             hundreds[(number % 1000) / 100], 
             tens[(number % 100) / 10], 
             units[number % 10]);
    return result;
}