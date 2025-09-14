#include "roman_numerals.h"
#include <stdlib.h>

#define MAXROMAN 15

typedef struct {
    int value;
    const char* numeral;
    int length;
} roman_mapping_t;

static const roman_mapping_t mappings[] = {
    {1000, "M", 1}, {900, "CM", 2}, {500, "D", 1}, {400, "CD", 2},
    {100, "C", 1}, {90, "XC", 2}, {50, "L", 1}, {40, "XL", 2},
    {10, "X", 1}, {9, "IX", 2}, {5, "V", 1}, {4, "IV", 2}, {1, "I", 1}
};

static const int mapping_count = sizeof(mappings) / sizeof(mappings[0]);

char *to_roman_numeral(int n)
{
    if (n <= 0)
        return NULL;

    char *result = malloc(MAXROMAN + 1);
    if (!result)
        return NULL;

    char *pos = result;
    
    for (int i = 0; i < mapping_count; i++) {
        while (n >= mappings[i].value) {
            n -= mappings[i].value;
            
            const char *src = mappings[i].numeral;
            for (int j = 0; j < mappings[i].length; j++) {
                *pos++ = *src++;
            }
            
            if (pos - result > MAXROMAN) {
                free(result);
                return NULL;
            }
        }
    }
    
    *pos = '\0';
    return result;
}