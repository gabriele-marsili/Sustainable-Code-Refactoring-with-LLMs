#include "roman_numerals.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define NUM_ROMAN_DIGITS 13
#define MAX_ROMAN_LENGTH 16 // Maximum length of a Roman numeral (e.g., MMMCMXCIX)

struct RomanNumeral {
    int arabic;
    char *roman;
};

const struct RomanNumeral ROMAN_DIGITS[NUM_ROMAN_DIGITS] = {
    { 1000, "M" }, {  900, "CM" }, { 500, "D" }, {  400, "CD" },
    {  100, "C" }, {   90, "XC" }, {  50, "L" }, {   40, "XL" },
    {   10, "X" }, {    9, "IX" }, {   5, "V" }, {    4, "IV" },
    {    1, "I" }
};

char *to_roman_numeral(int arabic) {
    if (arabic <= 0 || arabic > 3999) {
        return NULL; // Or handle the error as appropriate
    }

    char *roman_numeral = malloc(MAX_ROMAN_LENGTH + 1);
    if (!roman_numeral) {
        return NULL; // Handle memory allocation failure
    }
    roman_numeral[0] = '\0'; // Initialize as an empty string

    int i = 0;
    while (arabic > 0 && i < NUM_ROMAN_DIGITS) {
        if (arabic >= ROMAN_DIGITS[i].arabic) {
            strcat(roman_numeral, ROMAN_DIGITS[i].roman);
            arabic -= ROMAN_DIGITS[i].arabic;
        } else {
            i++;
        }
    }

    return roman_numeral;
}