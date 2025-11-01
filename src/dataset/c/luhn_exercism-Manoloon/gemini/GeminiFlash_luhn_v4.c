#include "luhn.h"
#include <stdbool.h>
#include <stddef.h>
#include <ctype.h>

bool luhn(const char *num) {
    if (num == NULL) return false;

    size_t len = 0;
    for (const char *p = num; *p != '\0'; ++p) {
        if (*p != ' ') {
            if (!isdigit(*p)) return false;
            len++;
        }
    }

    if (len < 2) return false;

    int sum = 0;
    bool alt = false;
    for (const char *p = num + strlen(num) - 1; p >= num; --p) {
        if (*p == ' ') continue;

        int digit = *p - '0';
        if (alt) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        alt = !alt;
    }

    return (sum % 10 == 0);
}