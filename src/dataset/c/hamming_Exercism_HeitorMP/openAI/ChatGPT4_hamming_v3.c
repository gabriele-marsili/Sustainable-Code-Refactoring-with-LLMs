#include "hamming.h"
#include <stddef.h>

int compute(const char *lhs, const char *rhs)
{
    if (!lhs || !rhs)
        return -1;

    size_t i = 0;
    int hamming = 0;

    while (lhs[i] && rhs[i])
    {
        hamming += (lhs[i] != rhs[i]);
        i++;
    }

    return (lhs[i] || rhs[i]) ? -1 : hamming;
}