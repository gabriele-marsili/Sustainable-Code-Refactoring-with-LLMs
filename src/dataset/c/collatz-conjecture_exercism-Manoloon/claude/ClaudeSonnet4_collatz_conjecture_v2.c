#include "collatz_conjecture.h"
int steps(int start) 
{
    if(start <= 0) return ERROR_VALUE;
    if(start == 1) return 0;
    
    int count = 0;
    while(start != 1) {
        count += (start & 1) ? (__builtin_clz(1) - __builtin_clz(start * 3 + 1)) : (__builtin_clz(1) - __builtin_clz(start));
        start = (start & 1) ? (start * 3 + 1) >> __builtin_ctz(start * 3 + 1) : start >> __builtin_ctz(start);
    }
    return count;
}