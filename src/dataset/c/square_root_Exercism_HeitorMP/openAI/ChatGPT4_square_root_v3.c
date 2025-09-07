#include "square_root.h"

UINT16 square_root(UINT16 number)
{
    if (number == 0 || number == 1)
        return number;

    UINT16 low = 1, high = number / 2, mid, result = 0;

    while (low <= high)
    {
        mid = low + (high - low) / 2;

        UINT32 midSquared = (UINT32)mid * mid;

        if (midSquared == number)
            return mid;
        else if (midSquared < number)
        {
            result = mid;
            low = mid + 1;
        }
        else
        {
            high = mid - 1;
        }
    }

    return 0;
}