#include "roman_numerals.h"
#include <string.h>
#include <stdlib.h>

#define NUM_ROMAN_DIGITS 13

struct RomanNumeral {
    int arabic;
    const char *greek;
};

const struct RomanNumeral ROMANDIGITS[NUM_ROMAN_DIGITS] = {
    {    1, "I" }, {    4, "IV" }, {    5, "V" }, {    9, "IX" },
    {   10, "X" }, {   40, "XL" }, {   50, "L" }, {   90, "XC" },
    {  100, "C" }, {  400, "CD" }, {  500, "D" }, {  900, "CM" },
    { 1000, "M" }
};

char *to_roman_numeral(int arabic) {
    char *greek = malloc(64);
    if (!greek) return NULL;
    greek[0] = '\0';
    char *ptr = greek;

    for (const struct RomanNumeral *n = ROMANDIGITS + NUM_ROMAN_DIGITS - 1; n >= ROMANDIGITS; n--) {
        while (arabic >= n->arabic) {
            size_t len = strlen(n->greek);
            memcpy(ptr, n->greek, len);
            ptr += len;
            arabic -= n->arabic;
        }
    }
    *ptr = '\0';
    return greek;
}