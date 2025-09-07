#include "hamming.h"
int compute(const char *lhs, const char *rhs)
{
    int flag = 0;
    
    while (*lhs && *rhs) {
        flag += (*lhs != *rhs);
        lhs++;
        rhs++;
    }
    
    return (*lhs || *rhs) ? -1 : flag;
}