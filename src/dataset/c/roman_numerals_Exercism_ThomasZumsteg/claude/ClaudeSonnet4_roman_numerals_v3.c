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
    if (arabic <= 0) {
        char *result = malloc(1);
        if (result) result[0] = '\0';
        return result;
    }
    
    char buffer[64];
    char *pos = buffer;
    
    for (int i = 0; i < NUM_ROMAN_DIGITS && arabic > 0; i++) {
        int count = arabic / ROMANDIGITS[i].arabic;
        if (count > 0) {
            const char *numeral = ROMANDIGITS[i].greek;
            int len = strlen(numeral);
            for (int j = 0; j < count; j++) {
                memcpy(pos, numeral, len);
                pos += len;
            }
            arabic %= ROMANDIGITS[i].arabic;
        }
    }
    
    *pos = '\0';
    int total_len = pos - buffer;
    char *result = malloc(total_len + 1);
    if (result) {
        memcpy(result, buffer, total_len + 1);
    }
    return result;
}