#include "luhn.h"
#include <stdbool.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

bool luhn(const char *num) {
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

    if (size < 2) {
        return false;
    }

    size_t sum = 0;
    bool odd = (size % 2 != 0); // Start doubling from the second digit from the right

    for (size_t i = 0; i < len; ++i) {
        if (isdigit(num[i])) {
            int digit = num[i] - '0';

            if (odd) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            odd = !odd;
        }
    }

    return (sum % 10 == 0);
}