#include "luhn.h"

#include <ctype.h>
#include <string.h>
#include <stdbool.h>

bool luhn(const char *number) {
    int sum = 0;
    int n = 0;
    int len = strlen(number);

    // Iterate backwards, skipping spaces and validating digits
    for (int i = len - 1; i >= 0; --i) {
        char c = number[i];

        if (c == ' ') {
            continue;
        }

        if (!isdigit(c)) {
            return false;
        }

        int digit = c - '0';

        // Apply Luhn algorithm
        if (n % 2 == 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        n++;
    }

    // Check if the number is valid
    return (n > 1 && (sum % 10 == 0));
}