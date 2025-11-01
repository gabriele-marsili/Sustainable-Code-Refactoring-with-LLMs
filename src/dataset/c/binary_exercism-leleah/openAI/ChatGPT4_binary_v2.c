#include "binary.h"

int convert(const char *input)
{
    int res = 0;
    int len = strlen(input);

    for (int j = 0; j < len; j++)
    {
        if (input[j] != '0' && input[j] != '1')
        {
            return INVALID;
        }
        if (input[j] == '1')
        {
            res = (res << 1) | 1;
        }
        else
        {
            res = res << 1;
        }
    }

    return res;
}