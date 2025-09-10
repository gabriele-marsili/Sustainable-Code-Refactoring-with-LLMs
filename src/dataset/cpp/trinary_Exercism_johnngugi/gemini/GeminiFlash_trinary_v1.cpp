#include "trinary.h"
#include <cctype>
#include <string>

namespace trinary
{
    int to_decimal(std::string n)
    {
        int result = 0;
        int power = 1;

        for (long i = n.length() - 1; i >= 0; --i)
        {
            if (!isdigit(n[i]))
            {
                return 0;
            }

            int digit = n[i] - '0';

            if (digit < 0 || digit > 2)
            {
                return 0;
            }

            result += digit * power;
            if (i > 0) {
              power *= 3;
            }
        }

        return result;
    }
}