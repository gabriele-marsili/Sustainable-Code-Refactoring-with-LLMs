#include "binary.h"

int convert(const char *input)
{
    int res = 0;
    for (int j = 0; input[j] != '\0'; j++)
    {
        if (input[j] != '0' && input[j] != '1')
        {
            return INVALID;
        }
        res = (res << 1) | (input[j] - '0');
    }
    return res;
}