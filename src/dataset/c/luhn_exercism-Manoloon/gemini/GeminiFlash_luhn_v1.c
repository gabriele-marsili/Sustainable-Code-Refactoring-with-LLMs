#include "luhn.h"
#include <stdbool.h>
#include <stddef.h>
#include <ctype.h>

bool luhn(const char *num) {
    if (num == NULL) return false;

    size_t len = 0;
    while (num[len] != '\0') {
        len++;
    }

    if (len < 2) return false;

    int sum = 0;
    bool alt = false;

    for (size_t i = len; i-- > 0;) {
        if (num[i] == ' ') continue;

        if (!isdigit(num[i])) return false;

        int digit = num[i] - '0';

        if (alt) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        alt = !alt;
    }

    return (sum % 10 == 0);
}