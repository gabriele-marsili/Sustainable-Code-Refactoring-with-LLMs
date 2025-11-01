#include "binary.h"
#include <string>

namespace binary
{
    int convert(const std::string& n)
    {
        for (char c : n)
        {
            if (c != '0' && c != '1') 
            {
                return 0;
            }
        }

        int sum = 0;
        for (char c : n)
        {
            sum = (sum << 1) + (c - '0');
        }

        return sum;
    }
}