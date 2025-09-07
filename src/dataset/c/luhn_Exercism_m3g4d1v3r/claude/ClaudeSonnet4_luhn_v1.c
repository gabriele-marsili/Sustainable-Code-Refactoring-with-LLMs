#include "luhn.h"

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;
    
    for (const char *p = num; *p; p++) {
        if (*p >= '0' && *p <= '9') {
            trimmed_len++;
        } else if (*p != ' ') {
            return false;
        }
    }
    return trimmed_len > 1;
}

bool luhn(const char *num) {
    if (!input_is_valid(num)) return false;
    
    size_t digit_count = 0;
    size_t sum = 0;
    
    // Process from right to left without calculating string length
    for (const char *p = num; *p; p++) {
        if (*p >= '0' && *p <= '9') {
            digit_count++;
        }
    }
    
    size_t position = 0;
    for (const char *p = num; *p; p++) {
        if (*p >= '0' && *p <= '9') {
            size_t value = *p - '0';
            if ((digit_count - position) % 2 == 0) {
                value <<= 1; // value *= 2
                if (value > 9) value -= 9;
            }
            sum += value;
            position++;
        }
    }
    
    return sum % 10 == 0;
}