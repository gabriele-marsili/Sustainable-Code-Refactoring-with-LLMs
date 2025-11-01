#include "armstrong_numbers.h"

#include <math.h>

bool is_armstrong_number(int candidate) {
    int orig_candidate = candidate;
    int length = (candidate == 0) ? 1 : (int)log10(candidate) + 1;

    int armstrong = 0;
    while (candidate > 0) {
        int r = candidate % 10;
        armstrong += (int)pow(r, length);
        candidate /= 10;
    }

    return armstrong == orig_candidate;
}