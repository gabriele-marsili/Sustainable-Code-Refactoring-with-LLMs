#include "largest_series_product.h"
#include <ctype.h>
#include <stddef.h>

int64_t largest_series_product(const char *input, const int series)
{
    if (series == 0)
        return 1;
    if (!input || series < 0)
        return -1;

    int64_t res = 0, tmp = 1;
    int valid_digits = 0, len = 0;

    for (const char *ptr = input; *ptr; ptr++, len++) {
        if (!isdigit(*ptr))
            return -1;

        int digit = *ptr - '0';

        if (valid_digits < series) {
            tmp *= digit;
            valid_digits++;
        } else {
            if (digit == 0) {
                tmp = 1;
                valid_digits = 0;
                continue;
            }
            tmp = (tmp / (ptr[-series] - '0')) * digit;
        }

        if (valid_digits == series && tmp > res)
            res = tmp;
    }

    return len < series ? -1 : res;
}