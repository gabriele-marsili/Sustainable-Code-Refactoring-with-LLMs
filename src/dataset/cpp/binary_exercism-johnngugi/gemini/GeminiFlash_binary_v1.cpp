#include "binary.h"
#include <string>
#include <algorithm>

using namespace std;

namespace binary
{
    int convert(string n)
    {
        for (char c : n) {
            if (c != '0' && c != '1') {
                return 0;
            }
        }

        int sum = 0;
        int power = 1;

        for (int i = n.length() - 1; i >= 0; --i) {
            if (n[i] == '1') {
                sum += power;
            }
            power *= 2;
        }

        return sum;
    }
}