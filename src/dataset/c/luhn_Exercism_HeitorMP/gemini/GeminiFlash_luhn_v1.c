#include "luhn.h"
#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool luhn(const char *num) {
    if (!num) return false;

    size_t len = strlen(num);
    size_t size = 0;

    // Pre-calculate the size and validate characters in a single loop
    for (size_t i = 0; i < len; ++i) {
        if (isdigit(num[i])) {
            size++;
        } else if (!isspace(num[i])) {
            return false; // Invalid character
        }
    }

    if (size < 2) return false;

    size_t sum = 0;
    bool alt = false;

    // Iterate backwards, skipping spaces, and perform Luhn algorithm
    for (long i = (long)len - 1; i >= 0; --i) {
        if (isspace(num[i])) continue;

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