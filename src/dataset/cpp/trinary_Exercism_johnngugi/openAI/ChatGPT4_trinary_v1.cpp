#include "trinary.h"
#include <string>

namespace trinary
{
    int to_decimal(std::string n)
    {
        int result = 0;

        for (char c : n)
        {
            if (c < '0' || c > '2') // Validate input
                return 0;

            result = result * 3 + (c - '0');
        }

        return result;
    }
}