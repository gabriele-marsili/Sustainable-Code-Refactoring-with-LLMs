#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    if (!lhs || !rhs)
        return -1;
    
    int hamming = 0;
    int i = 0;
    
    while (lhs[i] && rhs[i])
    {
        if (lhs[i] != rhs[i])
            hamming++;
        i++;
    }
    
    if (lhs[i] != rhs[i])
        return -1;
    
    return hamming;
}