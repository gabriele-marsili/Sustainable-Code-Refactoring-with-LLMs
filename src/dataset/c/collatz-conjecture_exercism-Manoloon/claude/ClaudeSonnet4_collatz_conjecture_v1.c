#include "collatz_conjecture.h"
int steps(int start) 
{
    if(start <= 0) return ERROR_VALUE;
    if(start == 1) return 0;
    
    int count = 0;
    while(start != 1) {
        if(start & 1) {
            start = start * 3 + 1;
        } else {
            start >>= 1;
        }
        count++;
    }
    return count;
}