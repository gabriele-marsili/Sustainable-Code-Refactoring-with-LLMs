#include "trinary.h"
#include <cctype>

namespace trinary
{
    int to_decimal(std::string n)
    {
        // Check for invalid characters upfront
        for (char c : n) {
            if (c < '0' || c > '2') {
                return 0;
            }
        }
        
        int result = 0;
        int power_of_3 = 1;
        
        // Process string from right to left without conversion to int
        for (int i = n.length() - 1; i >= 0; --i) {
            int digit = n[i] - '0';
            result += digit * power_of_3;
            power_of_3 *= 3;
        }
        
        return result;
    }   
}