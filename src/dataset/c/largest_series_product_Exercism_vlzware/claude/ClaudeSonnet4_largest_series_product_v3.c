#include "largest_series_product.h"
#include <ctype.h>
#include <stddef.h>
#include <string.h>

int64_t largest_series_product(const char *input, const int series)
{
    if (series == 0)
        return 1;
    if (!input || series < 0)
        return -1;

    const int len = strlen(input);
    if (len < series)
        return -1;

    for (int i = 0; i < len; i++) {
        if (!isdigit(input[i]))
            return -1;
    }

    int64_t max_product = 0;
    int64_t current_product = 1;
    
    for (int i = 0; i < series; i++) {
        current_product *= (input[i] - '0');
    }
    max_product = current_product;

    for (int i = series; i < len; i++) {
        int old_digit = input[i - series] - '0';
        int new_digit = input[i] - '0';
        
        if (old_digit == 0) {
            current_product = 1;
            for (int j = i - series + 1; j <= i; j++) {
                current_product *= (input[j] - '0');
            }
        } else {
            current_product = (current_product / old_digit) * new_digit;
        }
        
        if (current_product > max_product) {
            max_product = current_product;
        }
    }

    return max_product;
}