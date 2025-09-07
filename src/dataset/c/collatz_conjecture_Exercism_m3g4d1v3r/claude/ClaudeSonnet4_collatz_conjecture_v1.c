#include "collatz_conjecture.h"

int steps(int start) {
    if (start <= 0) return ERROR_VALUE;
    
    int step_counter = 0;
    
    while (start != 1) {
        if (start & 1) {  // odd number
            start = (start << 1) + start + 1;  // 3*start + 1
        } else {  // even number
            start >>= 1;  // start / 2
        }
        step_counter++;
    }
    
    return step_counter;
}