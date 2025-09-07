#include "hamming.h"

#include <string.h>

int compute(const char *lhs, const char *rhs)
{
    if (lhs == NULL || rhs == NULL)
    {
        return -1;
    }

    const char *p1 = lhs;
    const char *p2 = rhs;
    int distance = 0;

    while (*p1 && *p2)
    {
        if (*p1 != *p2)
        {
            distance++;
        }
        p1++;
        p2++;
    }

    if (*p1 || *p2)
    {
        return -1;
    }

    return distance;
}