#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    int hamming = 0;
    int i = 0;
    
    while (lhs[i] != '\0' && rhs[i] != '\0')
    {
        if (lhs[i] != rhs[i])
            hamming++;
        i++;
    }
    
    if (lhs[i] != rhs[i])
        return -1;
    
    return hamming;
}