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
    int len = 0, valid_digits = 0;

    for (const char *ptr = input; *ptr; ptr++) {
        if (!isdigit(*ptr))
            return -1;

        tmp *= *ptr - '0';
        valid_digits++;

        if (valid_digits > series) {
            tmp /= *(ptr - series) - '0';
        }

        if (valid_digits >= series && tmp > res) {
            res = tmp;
        }

        len++;
    }

    return len < series ? -1 : res;
}