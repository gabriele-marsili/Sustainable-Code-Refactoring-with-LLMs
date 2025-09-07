#include "hamming.h"
int compute(const char *lhs, const char *rhs)
{
    int flag = 0;
    const char *l = lhs;
    const char *r = rhs;
    
    while (*l && *r) {
        flag += (*l != *r);
        l++;
        r++;
    }
    
    return (*l || *r) ? -1 : flag;
}