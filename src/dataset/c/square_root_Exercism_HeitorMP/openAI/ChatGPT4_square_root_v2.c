#include "square_root.h"

UINT16 square_root(UINT16 number)
{
    if (number == 0 || number == 1)
        return number;

    UINT16 low = 1, high = number, result = 0;
    while (low <= high)
    {
        UINT16 mid = low + (high - low) / 2;
        UINT32 midSquared = (UINT32)mid * mid;

        if (midSquared == number)
            return mid;
        else if (midSquared < number)
        {
            low = mid + 1;
            result = mid;
        }
        else
        {
            high = mid - 1;
        }
    }
    return 0;
}