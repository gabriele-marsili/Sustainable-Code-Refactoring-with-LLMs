#include "collatz_conjecture.h"

int steps(int start) {
    if (start <= 0) return ERROR_VALUE;

    int step_counter = 0;
    unsigned int n = (unsigned int)start; 

    while (n != 1) {
        if ((n & 1) == 0) {
            n >>= 1;
        } else {
            if (n > (UINT_MAX - 1) / 3) return ERROR_VALUE;
            n = 3 * n + 1;
        }
        step_counter++;
    }
    return step_counter;
}