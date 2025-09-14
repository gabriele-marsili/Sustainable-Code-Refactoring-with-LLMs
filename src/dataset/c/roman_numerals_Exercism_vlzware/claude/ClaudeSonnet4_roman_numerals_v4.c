#include "roman_numerals.h"
#include <stdlib.h>

#define MAXROMAN 12
#define ELEMENTS 13

static const struct {
    int value;
    const char* numeral;
    int length;
} roman_map[ELEMENTS] = {
    {1000, "M", 1}, {900, "CM", 2}, {500, "D", 1}, {400, "CD", 2},
    {100, "C", 1}, {90, "XC", 2}, {50, "L", 1}, {40, "XL", 2},
    {10, "X", 1}, {9, "IX", 2}, {5, "V", 1}, {4, "IV", 2}, {1, "I", 1}
};

char *to_roman_numeral(int n)
{
    if (n <= 0)
        return NULL;

    char *res = malloc(MAXROMAN + 1);
    if (res == NULL)
        return NULL;

    char *tmp = res;
    
    for (int i = 0; i < ELEMENTS; i++) {
        while (n >= roman_map[i].value) {
            n -= roman_map[i].value;
            
            const char *src = roman_map[i].numeral;
            int len = roman_map[i].length;
            
            for (int j = 0; j < len; j++) {
                *tmp++ = *src++;
            }
            
            if (tmp - res > MAXROMAN) {
                free(res);
                return NULL;
            }
        }
    }
    *tmp = '\0';

    return res;
}