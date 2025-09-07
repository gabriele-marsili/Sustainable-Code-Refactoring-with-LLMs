#include "luhn.h"

#include <linux/limits.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;
    const char *ptr = num;

    while (*ptr) {
        if (*ptr >= '0' && *ptr <= '9') {
            trimmed_len++;
        } else if (*ptr != ' ') {
            return false;
        }
        ptr++;
    }
    return trimmed_len > 1;
}

bool luhn(const char *num) {
    if (!input_is_valid(num)) return false;
    
    size_t sum = 0;
    size_t digit_count = 0;
    const char *ptr = num;
    
    // Find end of string
    while (*ptr) ptr++;
    ptr--;
    
    // Process digits from right to left
    while (ptr >= num) {
        if (*ptr >= '0' && *ptr <= '9') {
            digit_count++;
            size_t value = *ptr - '0';
            
            if (digit_count % 2 == 0) {
                value <<= 1; // value *= 2
                if (value > 9) value -= 9;
            }
            sum += value;
        }
        ptr--;
    }
    
    return sum % 10 == 0;
}