#include "binary.h"
#include <cctype>

using namespace std;

namespace binary
{
    int convert(string n)
    {
        if (n.empty() || isalpha(n.back()))
        {
            return 0;
        }

        int sum = 0;
        int power_of_two = 1;
        
        for (int i = n.length() - 1; i >= 0; --i)
        {
            char digit = n[i];
            if (digit == '1')
            {
                sum += power_of_two;
            }
            else if (digit != '0')
            {
                return 0;
            }
            power_of_two <<= 1;
        }

        return sum;
    }   
}