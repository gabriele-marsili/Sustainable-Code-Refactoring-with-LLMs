#include "trinary.h"
#include <cctype>
#include <algorithm>

namespace trinary
{
    int to_decimal(std::string n)
    {
        for (char c : n) {
            if (!isdigit(c) || c < '0' || c > '2') {
                return 0;
            }
        }

        int result = 0;
        for (char c : n) {
            result = result * 3 + (c - '0');
        }

        return result;
    }   
}