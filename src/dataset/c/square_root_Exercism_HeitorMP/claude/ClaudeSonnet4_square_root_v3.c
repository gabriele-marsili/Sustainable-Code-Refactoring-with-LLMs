#include "square_root.h"

UINT16 square_root(UINT16 number)
{
    if (number <= 1)
        return number;
    
    UINT16 left = 1;
    UINT16 right = number;
    UINT16 result = 0;
    
    while (left <= right)
    {
        UINT16 mid = left + (right - left) / 2;
        UINT16 square = mid * mid;
        
        if (square == number)
            return mid;
        
        if (square < number)
        {
            left = mid + 1;
            result = mid;
        }
        else
        {
            right = mid - 1;
        }
    }
    
    return (result * result == number) ? result : 0;
}