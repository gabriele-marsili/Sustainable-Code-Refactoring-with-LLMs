#include "hamming.h"

int compute(const char *lhs, const char *rhs)
{
    int flag = 0;

    for (; *lhs && *rhs; lhs++, rhs++) {
        flag += (*lhs != *rhs);
    }

    return (*lhs || *rhs) ? -1 : flag;
}