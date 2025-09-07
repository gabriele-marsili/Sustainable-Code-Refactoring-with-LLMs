#include "luhn.h"

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    const char *ptr = num;
    
    while (*ptr != '\0')
    {
        if (*ptr == ' ')
        {
            ptr++;
            continue;
        }
        if (*ptr < '0' || *ptr > '9')
            return false;
        digit_count++;
        ptr++;
    }
    
    if (digit_count < 2)
        return false;
    
    bool is_even_position = false;
    ptr--;
    
    while (ptr >= num)
    {
        if (*ptr != ' ')
        {
            int digit = *ptr - '0';
            if (is_even_position)
            {
                digit *= 2;
                if (digit > 9)
                    digit -= 9;
            }
            sum += digit;
            is_even_position = !is_even_position;
        }
        ptr--;
    }
    
    return sum % 10 == 0;
}