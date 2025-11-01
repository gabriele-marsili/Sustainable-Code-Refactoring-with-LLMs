#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    int differences = 0;

    for (; *lhs && *rhs; lhs++, rhs++) {
        differences += (*lhs != *rhs);
    }

    return (*lhs || *rhs) ? -1 : differences;
}