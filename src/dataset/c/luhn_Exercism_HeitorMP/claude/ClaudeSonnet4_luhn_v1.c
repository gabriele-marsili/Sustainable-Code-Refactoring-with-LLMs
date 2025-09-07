#include "luhn.h"

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    size_t len = strlen(num);
    
    // Single pass validation and digit counting
    for (size_t i = 0; i < len; i++)
    {
        if (num[i] == ' ')
            continue;
        if (!isdigit(num[i]))
            return false;
        digit_count++;
    }
    
    if (digit_count < 2)
        return false;
    
    // Process digits directly without memory allocation
    bool is_second = false;
    for (int i = len - 1; i >= 0; i--)
    {
        if (num[i] == ' ')
            continue;
            
        int digit = num[i] - '0';
        
        if (is_second)
        {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        
        sum += digit;
        is_second = !is_second;
    }
    
    return sum % 10 == 0;
}