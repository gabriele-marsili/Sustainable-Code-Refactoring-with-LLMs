#include "collatz_conjecture.h"

int steps(int start) {
    if (start <= 0) return ERROR_VALUE;
    
    int step_counter = 0;
    
    while (start != 1) {
        step_counter++;
        start = (start & 1) ? (3 * start + 1) : (start >> 1);
    }
    
    return step_counter;
}