#include "roman_numerals.h"
#include <string.h>
#include <stdlib.h>

#define NUM_ROMAN_DIGITS 13

struct RomanNumeral{
    int arabic;
    const char *greek;
};

static const struct RomanNumeral ROMANDIGITS[NUM_ROMAN_DIGITS] = {
    { 1000, "M" }, {  900, "CM" }, {  500, "D" }, {  400, "CD" },
    {  100, "C" }, {   90, "XC" }, {   50, "L" }, {   40, "XL" },
    {   10, "X" }, {    9, "IX" }, {    5, "V" }, {    4, "IV" },
    {    1, "I" }
};

char *to_roman_numeral(int arabic) {
    char *greek = malloc(16);
    char *ptr = greek;
    
    for(int i = 0; i < NUM_ROMAN_DIGITS; i++) {
        int count = arabic / ROMANDIGITS[i].arabic;
        if(count > 0) {
            const char *numeral = ROMANDIGITS[i].greek;
            int len = strlen(numeral);
            for(int j = 0; j < count; j++) {
                memcpy(ptr, numeral, len);
                ptr += len;
            }
            arabic %= ROMANDIGITS[i].arabic;
        }
    }
    *ptr = '\0';
    return greek;
}