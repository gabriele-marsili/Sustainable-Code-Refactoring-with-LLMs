#include "collatz_conjecture.h"

int steps(int start) {
    int step_counter = 0;

    if (start <= 0) return (ERROR_VALUE);

    while (start != 1) {
        if (start % 2 == 0) {    // number is even
            start = start / 2;
        } else {    // number is odd
            start = 3 * start + 1;
        }
        step_counter++;
    }
    return (step_counter);
}
