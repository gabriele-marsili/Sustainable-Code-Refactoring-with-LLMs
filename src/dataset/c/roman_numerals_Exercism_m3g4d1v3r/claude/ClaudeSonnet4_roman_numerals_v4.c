#include "roman_numerals.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static const char * const thousands[] = {"", "M", "MM", "MMM"};
static const char * const hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
static const char * const tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
static const char * const units[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

char *to_roman_numeral(unsigned int number) {
    const char *th = thousands[number / 1000];
    const char *hu = hundreds[(number / 100) % 10];
    const char *te = tens[(number / 10) % 10];
    const char *un = units[number % 10];
    
    size_t len = strlen(th) + strlen(hu) + strlen(te) + strlen(un);
    char *result = malloc(len + 1);
    
    if (result == NULL) return NULL;
    
    strcpy(result, th);
    strcat(result, hu);
    strcat(result, te);
    strcat(result, un);
    
    return result;
}