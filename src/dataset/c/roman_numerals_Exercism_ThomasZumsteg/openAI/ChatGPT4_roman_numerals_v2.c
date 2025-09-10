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
    char *greek = malloc(64); // Allocate fixed size memory
    if (!greek) return NULL; // Check for allocation failure
    char *ptr = greek; // Pointer to track current position
    for (const struct RomanNumeral *n = ROMANDIGITS + NUM_ROMAN_DIGITS - 1; n >= ROMANDIGITS; n--) {
        while (arabic >= n->arabic) {
            strcpy(ptr, n->greek); // Copy directly to the current position
            ptr += strlen(n->greek); // Move pointer forward
            arabic -= n->arabic;
        }
    }
    *ptr = '\0'; // Null-terminate the string
    return greek;
}