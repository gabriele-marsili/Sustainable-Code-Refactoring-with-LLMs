#include "luhn.h"

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    size_t len = strlen(num);
    
    for (size_t i = 0; i < len; i++)
    {
        if (!isdigit(num[i]) && num[i] != ' ')
            return false;
        if (isdigit(num[i]))
            digit_count++;
    }
    
    if (digit_count < 2)
        return false;
    
    bool is_even_position = false;
    for (int i = len - 1; i >= 0; i--)
    {
        if (num[i] == ' ')
            continue;
            
        int digit = num[i] - '0';
        
        if (is_even_position)
        {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        
        sum += digit;
        is_even_position = !is_even_position;
    }
    
    return sum % 10 == 0;
}