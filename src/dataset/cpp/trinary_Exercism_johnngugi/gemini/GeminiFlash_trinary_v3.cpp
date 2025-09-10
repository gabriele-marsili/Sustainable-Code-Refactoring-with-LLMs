#include "trinary.h"
#include <cctype>
#include <string>

namespace trinary
{
    int to_decimal(std::string n)
    {
        int result = 0;
        size_t len = n.length();

        for (size_t i = 0; i < len; ++i)
        {
            if (!isdigit(n[i]))
            {
                return 0;
            }
            int digit = n[i] - '0';
            if (digit < 0 || digit > 2) {
                return 0;
            }
            result = result * 3 + digit;
        }

        return result;
    }
}