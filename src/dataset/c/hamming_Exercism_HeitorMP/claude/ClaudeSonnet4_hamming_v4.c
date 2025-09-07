#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    const char *p1 = lhs;
    const char *p2 = rhs;
    
    while (*p1 && *p2 && *p1 == *p2) {
        p1++;
        p2++;
    }
    
    if ((*p1 == '\0') != (*p2 == '\0'))
        return -1;
    
    int hamming = 0;
    while (*p1) {
        if (*p1 != *p2)
            hamming++;
        p1++;
        p2++;
    }
    
    return hamming;
}