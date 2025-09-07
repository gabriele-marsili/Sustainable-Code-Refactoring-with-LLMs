#include "luhn.h"
#include <cctype>
#include <cstring>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;
    for (const char *p = num; *p != '\0'; ++p) {
        if (std::isdigit(*p)) {
            trimmed_len++;
        } else if (!std::isspace(*p)) {
            return false;
        }
    }
    return trimmed_len > 1;
}

bool luhn(const char *num) {
    size_t luhn = 0;
    size_t num_len = strlen(num);

    if (!input_is_valid(num)) {
        return false;
    }

    bool double_it = false;
    for (long i = num_len - 1; i >= 0; --i) {
        if (std::isdigit(num[i])) {
            int value = num[i] - '0';
            if (double_it) {
                value *= 2;
                if (value > 9) {
                    value -= 9;
                }
            }
            luhn += value;
            double_it = !double_it;
        }
    }

    return (luhn % 10 == 0);
}