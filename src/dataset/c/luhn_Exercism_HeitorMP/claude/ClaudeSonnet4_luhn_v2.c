#include "luhn.h"

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    const char *ptr = num;
    
    // Single pass to validate and count digits
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
    
    // Process digits from right to left without creating new string
    bool double_next = false;
    ptr = num + strlen(num) - 1;
    
    while (ptr >= num)
    {
        if (*ptr == ' ')
        {
            ptr--;
            continue;
        }
        
        int digit = *ptr - '0';
        
        if (double_next)
        {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        
        sum += digit;
        double_next = !double_next;
        ptr--;
    }
    
    return (sum % 10 == 0);
}