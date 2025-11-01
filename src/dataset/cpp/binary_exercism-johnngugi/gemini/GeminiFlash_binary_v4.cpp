#include "binary.h"
#include <string>
#include <algorithm>

using namespace std;

namespace binary
{
    int convert(string n)
    {
        int sum = 0;
        int power = 0;

        for (int i = n.length() - 1; i >= 0; --i)
        {
            if (n[i] != '0' && n[i] != '1')
            {
                return 0;
            }

            if (n[i] == '1')
            {
                sum += (1 << power);
            }
            ++power;
        }

        return sum;
    }
}