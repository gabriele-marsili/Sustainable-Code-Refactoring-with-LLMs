#include "trinary.h"
#include <cctype>

namespace trinary
{
    int to_decimal(std::string n)
    {
        if (n.empty() || std::isalpha(n.back()))
        {
            return 0;
        }

        int result = 0;
        int power_of_3 = 1;
        
        for (int i = n.length() - 1; i >= 0; --i)
        {
            char digit = n[i];
            if (digit < '0' || digit > '2')
            {
                return 0;
            }
            
            result += (digit - '0') * power_of_3;
            power_of_3 *= 3;
        }

        return result;
    }   
}