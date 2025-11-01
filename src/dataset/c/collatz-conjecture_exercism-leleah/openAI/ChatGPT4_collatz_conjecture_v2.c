#include "collatz_conjecture.h"

int steps(int start) {
    if (start <= 0) {
        return ERROR_VALUE;
    }

    int steps = 0;
    while (start != 1) {
        if (start & 1) { // Check if odd using bitwise AND
            start = start * 3 + 1;
        } else {
            start >>= 1; // Use bitwise right shift for division by 2
        }
        steps++;
    }
    return steps;
}