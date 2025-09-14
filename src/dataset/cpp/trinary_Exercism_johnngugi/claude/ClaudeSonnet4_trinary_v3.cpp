#include "trinary.h"
#include <cctype>

namespace trinary
{
    int to_decimal(std::string n)
    {
        if (n.empty() || !std::isdigit(n.back()))
        {
            return 0;
        }

        int result = 0;
        int power = 1;
        
        for (auto it = n.rbegin(); it != n.rend(); ++it)
        {
            if (!std::isdigit(*it) || *it > '2')
            {
                return 0;
            }
            
            result += (*it - '0') * power;
            power *= 3;
        }

        return result;
    }   
}