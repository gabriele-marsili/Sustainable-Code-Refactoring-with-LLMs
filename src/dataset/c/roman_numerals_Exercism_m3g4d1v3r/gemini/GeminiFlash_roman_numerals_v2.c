#include "roman_numerals.h"

#include <stdlib.h>
#include <string.h>

char *to_roman_numeral(unsigned int number) {
    if (number > 3999 || number == 0) return NULL;

    char *result = malloc(MAX_OUTPUT + 1);
    if (!result) return NULL;
    result[0] = '\0';

    int num = number;
    while (num >= 1000) {
        strcat(result, "M");
        num -= 1000;
    }
    if (num >= 900) {
        strcat(result, "CM");
        num -= 900;
    } else if (num >= 500) {
        strcat(result, "D");
        num -= 500;
    } else if (num >= 400) {
        strcat(result, "CD");
        num -= 400;
    } else {
        while (num >= 100) {
            strcat(result, "C");
            num -= 100;
        }
    }

    if (num >= 90) {
        strcat(result, "XC");
        num -= 90;
    } else if (num >= 50) {
        strcat(result, "L");
        num -= 50;
    } else if (num >= 40) {
        strcat(result, "XL");
        num -= 40;
    } else {
        while (num >= 10) {
            strcat(result, "X");
            num -= 10;
        }
    }

    if (num >= 9) {
        strcat(result, "IX");
        num -= 9;
    } else if (num >= 5) {
        strcat(result, "V");
        num -= 5;
    } else if (num >= 4) {
        strcat(result, "IV");
        num -= 4;
    } else {
        while (num >= 1) {
            strcat(result, "I");
            num -= 1;
        }
    }

    return result;
}