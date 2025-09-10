#include "hexadecimal.h"

using namespace std;

int pow16(int exponent)
{
    static const int powersOf16[] = {1, 16, 256, 4096, 65536, 1048576, 16777216, 268435456};
    return (exponent >= 0 && exponent < 8) ? powersOf16[exponent] : 0;
}

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    for (int i = 0; i < len; i++)
    {
        char c = input[i];
        int value = (c >= '0' && c <= '9') ? (c - '0') :
                    (c >= 'a' && c <= 'f') ? hexaTable[c] : -1;
        if (value == -1) return 0;
        result += value * pow16(len - i - 1);
    }
    return result;
}