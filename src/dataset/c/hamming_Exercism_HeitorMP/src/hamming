#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    int hamming = 0;
    for (int i = 0; lhs[i] != '\0' && rhs[i] != '\0'; i++)
    {
        if (lhs[i] != rhs[i])
            hamming++;
    }
    return (lhs[hamming] != '\0' || rhs[hamming] != '\0') ? -1 : hamming;
}