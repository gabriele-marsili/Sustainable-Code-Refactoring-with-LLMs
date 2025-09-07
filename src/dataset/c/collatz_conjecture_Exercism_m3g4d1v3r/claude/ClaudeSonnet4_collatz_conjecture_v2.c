#include "collatz_conjecture.h"

int steps(int start) {
    if (start <= 0) return ERROR_VALUE;
    
    int step_counter = 0;
    
    while (start != 1) {
        if (start & 1) {    // number is odd
            start = 3 * start + 1;
        } else {    // number is even
            start >>= 1;
        }
        step_counter++;
    }
    return step_counter;
}